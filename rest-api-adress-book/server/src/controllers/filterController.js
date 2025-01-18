import { Router } from "express";
import filterService from "../services/filterService.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const filterController = Router();

// Път за извличане на всички контатки
filterController.get("/all", authMiddleware, async (req, res) => {
    const ownerId = req.user.id;
    try {
        const contacts = await filterService.getAllContacts(ownerId);
        res.json(contacts);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Път за извличане на всички контатки по най-попюлярни етикети
filterController.get("/popular-labels", authMiddleware, async (req, res) => {
    const ownerId = req.user.id;
    try {
        const contacts = await filterService.getContactsByPopularLabels(ownerId);
        res.json(contacts);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Път за извличане на един контакт по име и фамилия
filterController.post("/search", authMiddleware, async (req, res) => {
    const ownerId = req.user.id;
    const { firstName, lastName } = req.body;

    try {
        const contacts = await filterService.searchByName(ownerId, firstName, lastName);
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Път за извличане на всички контатки с еднакви първи имена и различни фамилии
filterController.get("/same-first-names", authMiddleware, async (req, res) => {
    const ownerId = req.user.id;
    try {
        const groups = await filterService.getContactsByFirstName(ownerId);
        res.json(groups);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Път за извличане на всички контатки с еднакви фамилии и различни първи имена
filterController.get("/same-last-names", authMiddleware, async (req, res) => {
    const ownerId = req.user.id;
    try {
        const groups = await filterService.getContactsByLastName(ownerId);
        res.json(groups);
    } catch (err) {
        res.json({ message: err.message });
    }
});

export default filterController;