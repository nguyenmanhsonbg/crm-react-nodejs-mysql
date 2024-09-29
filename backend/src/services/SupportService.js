// services/SupportService.js

const { Support, User, ComputerRoom } = require('../../models');

class SupportService {
  async getAllSupport() {
    try {
      const supportList = await Support.findAll({
        include: [
          { model: User, as: 'user' },
          { model: ComputerRoom, as: 'computerRoom' },
        ],
      });
      return supportList;
    } catch (error) {
      console.error('Error in getAllSupport:', error);
      throw error;
    }
  }

  async getSupportById(id) {
    try {
      const support = await Support.findByPk(id, {
        include: [
          { model: User, as: 'user' },
          { model: ComputerRoom, as: 'computerRoom' },
        ],
      });
      if (!support) {
        return null;
      }
      return support;
    } catch (error) {
      console.error(`Error in getSupportById (${id}):`, error);
      throw error;
    }
  }

  async createSupport(data) {
    try {
      const newSupport = await Support.create(data);
      return newSupport;
    } catch (error) {
      console.error('Error in createSupport:', error);
      throw error;
    }
  }

  async updateSupport(id, data) {
    try {
      const support = await Support.findByPk(id);
      if (!support) {
        return null;
      }
      await support.update(data);
      return support;
    } catch (error) {
      console.error(`Error in updateSupport (${id}):`, error);
      throw error;
    }
  }

  async deleteSupport(id) {
    try {
      const support = await Support.findByPk(id);
      if (!support) {
        return null;
      }
      await support.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteSupport (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new SupportService();
