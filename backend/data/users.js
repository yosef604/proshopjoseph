import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'AdminUser',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true
    },
    {
        name: 'yosef',
        email: 'yosef@example.com',
        password: bcrypt.hashSync('123456')
    },
    {
        name: 'nissim',
        email: 'nisssim@example.com',
        password: bcrypt.hashSync('123456')
    },
]

export default users