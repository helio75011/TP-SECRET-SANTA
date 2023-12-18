const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./backend/routes/authRoutes');
const userRoutes = require('./backend/routes/userRoutes');
const groupRoutes = require('./backend/routes/groupRoutes');
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue dans l\'API Secret Santa!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

mongoose.set("strictQuery", false)

mongoose.connect('mongodb+srv://heliodb:test@apinode.msrhczf.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log(error)
}) 