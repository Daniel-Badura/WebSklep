import React from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import i18n from '../i18n';


const LanguageDropdown = () => {
    const locales = {
        en: {
            title: 'English'
        },
        pl: {
            title: 'Polski'
        }
    };
    return (
        <MDBDropdown>
            <MDBDropdownToggle>Change Language</MDBDropdownToggle>
            <MDBDropdownMenu>
                {Object.keys(locales).map((locale) => (
                    <MDBDropdownItem key={locale} className='dropdown-item' onClick={() => i18n.changeLanguage(locale)}>
                        {locales[locale].title}
                    </MDBDropdownItem>))}
            </MDBDropdownMenu>
        </MDBDropdown>
    );
};

export default LanguageDropdown;