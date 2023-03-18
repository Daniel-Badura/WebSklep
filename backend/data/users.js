import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        lastname: 'Admin',
        email: 'admin@admin.admin',
        phone: '0123456789',
        password: bcrypt.hashSync('101010', 10),
        isAdmin: true
    },
    {
        name: 'Kasia',
        lastname: 'Kasia',
        email: 'kasia@kasia.pl',
        phone: '0123456789',
        password: bcrypt.hashSync('101010', 10),
        isAdmin: true
    },
    {
        name: 'Daniel',
        lastname: 'Daniel',
        email: 'daniel@daniel.pl',
        phone: '0123456789',
        password: bcrypt.hashSync('101010', 10),
        isAdmin: true
    }


];

export default users;