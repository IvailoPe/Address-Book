import { Router } from "express";
import contactService from "../services/contactService.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkPermission from "../middlewares/permissionMiddleware.js";

const contactController = Router();

// Път за създаване на нов контакт
contactController.post("/", authMiddleware, async (req, res) => {
    const ownerId = req.user.id;
    const contactData = req.body;

    try {
        const contact = await contactService.createContact(ownerId, contactData);
        res.json(contact);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Път за извличане на всички контакти на потребителя
contactController.get("/", authMiddleware, async (req, res) => {
    const ownerId = req.user.id;

    try {
        const contacts = await contactService.getContactsByUser(ownerId);
        res.json(contacts);
    } catch (err) {
        res.json({ message: "Error retrieving contacts" });
    }
});

// Път за извличане на контакт по ID
contactController.get("/:id", authMiddleware,checkPermission, async (req, res) => {
    const { id: contactId } = req.params;

    try {
        const contact = await contactService.getContactById(contactId);
        res.json(contact);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Път за актуализиране на контакт по ID
contactController.put("/:id", authMiddleware, async (req, res) => {
    const { id: contactId } = req.params;
    const updatedData = req.body;
    
    try {
        const updatedContact = await contactService.updateContact(contactId, updatedData);
        res.json(updatedContact);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Път за изтриване на контакт по ID
contactController.delete("/:id", authMiddleware, async (req, res) => {
    const { id: contactId } = req.params;

    try {
        const deletedContact = await contactService.deleteContact(contactId);
        res.json({ message: "Contact deleted successfully", contact: deletedContact });
    } catch (err) {
        res.json({ message: err.message });
    }
});

export default contactController;
