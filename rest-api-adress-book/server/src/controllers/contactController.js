import { Router } from "express";
import contactService from "../services/contactService.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const contactController = Router();

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

contactController.get("/", authMiddleware, async (req, res) => {
    const ownerId = req.user.id;

    try {
        const contacts = await contactService.getContactsByUser(ownerId);
        res.json(contacts);
    } catch (err) {
        res.json({ message: "Error retrieving contacts" });
    }
});

contactController.get("/:id", authMiddleware, async (req, res) => {
    const { id: contactId } = req.params;

    try {
        const contact = await contactService.getContactById(contactId);
        res.json(contact);
    } catch (err) {
        res.json({ message: err.message });
    }
});

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
