import Contact from "../models/Contact.js";

const filterService = {
    // Метод за извличане на всички контакти
    async getAllContacts(ownerId) {
        try {
            const contacts = await Contact.find({ ownerId });
            return contacts;
        } catch (error) {
            throw new Error(`Error fetching contacts: ${error.message}`);
        }
    },
    // Метод за извличане на контакти на потребител посредством най-често срещания етикет
    async getContactsByPopularLabels(ownerId) {
        const contacts = await Contact.find({ ownerId });

        const labelCount = {};
        for (const contact of contacts) {
            for (const label of contact.labels) {
                if (!labelCount[label.name]) {
                    labelCount[label.name] = 0;
                }
                labelCount[label.name]++;
            }
        }

        let mostPopularLabel = null;
        let maxCount = 0;
        for (const labelName in labelCount) {
            if (labelCount[labelName] > maxCount) {
                maxCount = labelCount[labelName];
                mostPopularLabel = labelName;
            }
        }

        const resultContacts = [];
        for (const contact of contacts) {
            for (const label of contact.labels) {
                if (label.name === mostPopularLabel) {
                    resultContacts.push(contact);
                }
            }
        }

        return resultContacts;
    },
    
    // Метод за извличане на контакт по име и фамилия
    async searchByName(ownerId, firstNameSearch, lastNameSearch) {
        const contacts = await Contact.find({ ownerId });
        const resultContacts = [];
        for (const contact of contacts) {
            if (firstNameSearch === contact.firstName && lastNameSearch === contact.lastName) {
                resultContacts.push(contact);
            }
        }

        return resultContacts;
    },

    // Метод за извличане на контакти които имат еднакви първи имена и различни фамилии
    async getContactsByFirstName(ownerId) {
        const contacts = await Contact.find({ ownerId });

        const firstNameGroups = {};
        for (const contact of contacts) {
            if (!firstNameGroups[contact.firstName]) {
                firstNameGroups[contact.firstName] = [];
            }

            let hasSameLastName = false;
            for (const groupedContact of firstNameGroups[contact.firstName]) {
                if (groupedContact.lastName === contact.lastName) {
                    hasSameLastName = true;
                    break;
                }
            }

            if (!hasSameLastName) {
                firstNameGroups[contact.firstName].push(contact);
            }
        }

        const result = [];
        for (const firstName in firstNameGroups) {
            if (firstNameGroups[firstName].length > 1) {
                result.push(...firstNameGroups[firstName]);
            }
        }

        return result;
    },


    // Метод за извличане на контакти които имат еднакви фамилии и различни първи имена
    async getContactsByLastName(ownerId) {
        const contacts = await Contact.find({ ownerId });

        const lastNameGroups = {};
        for (const contact of contacts) {
            if (!lastNameGroups[contact.lastName]) {
                lastNameGroups[contact.lastName] = [];
            }

            let hasSameFirstName = false;
            for (const groupedContact of lastNameGroups[contact.lastName]) {
                if (groupedContact.firstName === contact.firstName) {
                    hasSameFirstName = true;
                    break;
                }
            }

            if (!hasSameFirstName) {
                lastNameGroups[contact.lastName].push(contact);
            }
        }

        const result = [];
        for (const lastName in lastNameGroups) {
            if (lastNameGroups[lastName].length > 1) {
                result.push(...lastNameGroups[lastName]);
            }
        }

        return result;
    }
}

export default filterService