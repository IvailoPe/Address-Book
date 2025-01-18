import Contact from '../models/Contact.js';

// Middleware за проверка дали потребителя е собственик на контакт
const checkPermission = async (req, res, next) => {
    const currentUserId = req.user.id;
    const { id: contactId } = req.params;

    const contact = await Contact.findById(contactId);
    
    if(contact.ownerId.toString() === currentUserId){
        next();
    }
    else{
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default checkPermission;