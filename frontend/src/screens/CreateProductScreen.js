import React from 'react';

const CreateProductScreen = () => {


    const createProductHandler = (product) => {
        // Create Product
    };
    return (
        <FormContainer>
            <h1>
                Register
            </h1>
            {message && <Message variant='danger'> {message} </Message>}
            { }
            {error && error.split(',').map(errorMessage => <Message key={errorMessage} variant='danger'> {errorMessage.trim().replace('Path ', '')} </Message>)}
            {/* {error && <Message variant='danger'> {error} </Message>} */}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='pt-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='lastname' className='pt-2'>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Lastname'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='pt-2'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='phone' className='pt-2'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type='tel'
                        placeholder='Phone #'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='pt-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword' className='pt-2'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='text-center my-2'>
                    Submit
                </Button>
            </Form>
            <Row>
                <Col>
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Have an account?{' '}
                    </Link>
                </Col>
            </Row>
        </FormContainer >
    );
};

export default CreateProductScreen;