// services/ComputerRoomService.js

const { ComputerRoom, Computer, IncidentReport, Support } = require("../../models");

class ComputerRoomService {
  /**
   * Retrieve all computer rooms with their associated computers, incident reports, and supports.
   * @returns {Promise<Array>}
   */
  async getAllComputerRooms() {
    try {
      const rooms = await ComputerRoom.findAll({
        include: [
          {
            model: Computer,
            as: "computers",
          },
          {
            model: IncidentReport,
            as: "incidentReports",
          },
          {
            model: Support,
            as: "supports",
          },
        ],
      });
      return rooms;
    } catch (error) {
      console.error("Error in getAllComputerRooms:", error);
      throw error;
    }
  }

  /**
   * Retrieve a single computer room by ID with its associations.
   * @param {number} id - The ID of the computer room.
   * @returns {Promise<Object>}
   */
  async getComputerRoomById(id) {
    try {
      console.log(id)
      const room = await ComputerRoom.findByPk(id, {
        include: [
          {
            model: Computer,
            as: "computers",
          },
          {
            model: IncidentReport,
            as: "incidentReports",
          },
          {
            model: Support,
            as: "supports",
          },
        ],
      });

      if (!room) {
        const error = new Error("ComputerRoom not found");
        error.status = 404;
        throw error;
      }

      return room;
    } catch (error) {
      console.error(`Error in getComputerRoomById (${id}):`, error);
      throw error;
    }
  }

  /**
   * Create a new computer room.
   * @param {Object} data - The data for the new computer room.
   * @returns {Promise<Object>}
   */
  async createComputerRoom(data) {
    try {
      const newRoom = await ComputerRoom.create(data);
      return newRoom;
    } catch (error) {
      console.error("Error in createComputerRoom:", error);
      throw error;
    }
  }

  /**
   * Update an existing computer room by ID.
   * @param {number} id - The ID of the computer room to update.
   * @param {Object} data - The updated data for the computer room.
   * @returns {Promise<Object>}
   */
  async updateComputerRoom(id, data) {
    try {
      const room = await ComputerRoom.findByPk(id);
      if (!room) {
        const error = new Error("ComputerRoom not found");
        error.status = 404;
        throw error;
      }

      await room.update(data);
      return room;
    } catch (error) {
      console.error(`Error in updateComputerRoom (${id}):`, error);
      throw error;
    }
  }

  /**
   * Delete a computer room by ID.
   * @param {number} id - The ID of the computer room to delete.
   * @returns {Promise<void>}
   */
  async deleteComputerRoom(id) {
    try {
      const room = await ComputerRoom.findByPk(id);
      if (!room) {
        const error = new Error("ComputerRoom not found");
        error.status = 404;
        throw error;
      }

      await room.destroy();
    } catch (error) {
      console.error(`Error in deleteComputerRoom (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new ComputerRoomService();
