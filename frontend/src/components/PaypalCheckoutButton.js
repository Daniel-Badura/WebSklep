import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import React, { useState } from "react";
import { payOrder } from "../actions/orderActions";
import { useDispatch } from "react-redux";

const PaypalCheckoutButton = ({ amount, currency, orderId }) => {
  const [clientId, setClientId] = useState(null);
  const dispatch = useDispatch();
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder({ orderId, paymentResult }));
  };

  const paypalHandler = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");
    return clientId;
  };
  paypalHandler().then((clientId) => setClientId(clientId));

  return (
    clientId && (
      <PayPalScriptProvider
        options={{
          "client-id": clientId,
          currency: currency,
        }}
      >
        <PayPalButtons
          currency={currency}
          showSpinner={false}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            successPaymentHandler(order);
          }}
        />
      </PayPalScriptProvider>
    )
  );
};

export default PaypalCheckoutButton;
