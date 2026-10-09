const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


let users = [
    { id: 1, name: 'Prabir' },
    { id: 2, name: 'Vivek' }
];


app.get('/users', (req, res) => {
    res.status(200).json(users);
});


app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
});


app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name
    };

    users.push(newUser);
    res.status(201).json(newUser);
});


app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { name } = req.body;

    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    users[userIndex].name = name;
    res.status(200).json(users[userIndex]);
});


app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const deletedUser = users.splice(userIndex, 1);
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser[0] });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});