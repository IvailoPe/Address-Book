import Contact from "../models/Contact.js";
import User from "../models/User.js";

class ContactService {
    // Метод за създаване на контакт
    async createContact(ownerId, contactData) { 
        try {
            const contact = new Contact({ ...contactData, ownerId });
            await contact.save();

            const user = await User.findById(ownerId);
            if (!user) {
                throw new Error("User not found");
            }
            user.contacts.push(contact._id);
            await user.save();

            return contact;
        } catch (error) {
            throw new Error(`Error creating contact: ${error.message}`);
        }
    }

    // Метод за извличане на контакти на даден потребител
    async getContactsByUser(ownerId) {
        try {
            const contacts = await Contact.find({ ownerId }).populate(
                "ownerId",
                "username email"
            );
            return contacts;
        } catch (error) {
            throw new Error(`Error fetching contacts: ${error.message}`);
        }
    }

    // Метод за извличане на един контакт на даден потребител
    async getContactById(contactId) {
        try {
            const contact = await Contact.findById(contactId);
            if (!contact) {
                throw new Error("Contact not found");
            }
            return contact;
        } catch (error) {
            throw new Error(`Error fetching contact: ${error.message}`);
        }
    }

    // Метод за актуализиране на един контакт
    async updateContact(contactId, updatedData) {
      try {
          const contact = await Contact.findById(contactId);
          if (!contact) {
              throw new Error("Contact not found");
          }
  
          const {
              firstName,
              lastName,
              companyName,
              address,
              phoneNumber,
              email,
              faxNumber,
              comment,
              image
          } = updatedData;
          if (firstName) contact.firstName = firstName;
          if (lastName) contact.lastName = lastName;
          if (companyName) contact.companyName = companyName;
          if (address) contact.address = address;
          if (phoneNumber) contact.phoneNumber = phoneNumber;
          if (email) contact.email = email;
          if (faxNumber) contact.faxNumber = faxNumber;
          if (comment || comment === "") contact.comment = comment;
          if (image) contact.image = image;

          if (!updatedData.labels || updatedData.labels.length === 0) {
              throw new Error("At least one label is required.");
          }
          contact.labels = updatedData.labels;
  
          if (updatedData.customFields) {
            contact.customFields = updatedData.customFields
          }
          else if(updatedData.customFields.length === 0){
            contact.customFields = []
          }
  
          await contact.save();
          return contact;
      } catch (error) {
          throw new Error(`Error updating contact: ${error.message}`);
      }
  }
  
    // Метод за изтриване на даден контакт
    async deleteContact(contactId) {
        try {
            const contact = await Contact.findByIdAndDelete(contactId);
            if (!contact) {
                throw new Error("Contact not found");
            }

            await User.updateOne(
                { contacts: contactId },
                { $pull: { contacts: contactId } }
            );

            return contact;
        } catch (error) {
            throw new Error(`Error deleting contact: ${error.message}`);
        }
    }
}

export default new ContactService();
