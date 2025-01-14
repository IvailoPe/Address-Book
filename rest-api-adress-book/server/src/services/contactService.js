import Contact from "../models/Contact";
import User from "../models/User.js";


class ContactService {

    async createContact(ownerId, contactData) {
      try {
        const contact = new Contact({ ...contactData, ownerId });
        await contact.save();
  
        const user = await User.findById(ownerId);
        if (!user) {
          throw new Error('User not found');
        }
        user.contacts.push(contact._id);
        await user.save();
  
        return contact; 
        
      } catch (error) {
        throw new Error(`Error creating contact: ${error.message}`);
      }
    }

  async getContactsByUser(ownerId) {
    try {
      const contacts = await Contact.find({ ownerId }).populate('ownerId', 'username email');
      return contacts;
    } catch (error) {
      throw new Error(`Error fetching contacts: ${error.message}`);
    }
  }

  async getContactById(contactId) {
    try {
      const contact = await Contact.findById(contactId);
      if (!contact) {
        throw new Error('Contact not found');
      }
      return contact;
    } catch (error) {
      throw new Error(`Error fetching contact: ${error.message}`);
    }
  }

    async updateContact(contactId, updatedData) {
      try {
        const contact = await Contact.findByIdAndUpdate(contactId, updatedData, { new: true });
        if (!contact) {
          throw new Error('Contact not found');
        }
        return contact;
      } catch (error) {
        throw new Error(`Error updating contact: ${error.message}`);
      }
    }

     // Delete a contact by ID
  async deleteContact(contactId) {
    try {
      const contact = await Contact.findByIdAndDelete(contactId);
      if (!contact) {
        throw new Error('Contact not found');
      }

      // Remove contact from user's contacts array
      await User.updateOne({ contacts: contactId }, { $pull: { contacts: contactId } });

      return contact;
    } catch (error) {
      throw new Error(`Error deleting contact: ${error.message}`);
    }
  }
}

export default new ContactService();