// services/ComputerRoomService.js

const { ComputerRoom, Computer, ComputersDevices, ComputerSoftware, IncidentReport, Support, User, Device, Software, ReportDetail } = require("../../models");

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
            include: [
              {
                model: User, // Include mô hình User trong Support
                as: "user",
                attributes: ["user_id", "full_name"], // Chỉ lấy các trường cần thiết
              },
            ],
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
      const room = await ComputerRoom.findByPk(id, {
        include: [
          {
            model: Computer,
            as: "computers",
            include: [
              {
                model: ComputersDevices, // Include devices related to the computer
                as: "computersDevices",
                include:[
                  {
                    model: Device,
                    as: "device"
                  }           
                ]
              },
              {
                model: ComputerSoftware, // Include software related to the computer
                as: "computerSoftware",
                include:[{
                  model: Software,
                  as: "software"
                }]
              },
            ],
          },
          {
            model: IncidentReport,
            as: "incidentReports",
            include:[{
              model: ReportDetail,
              as: "reportDetails",
              include:[
                {
                model: ComputersDevices,
                as: 'computersDevice',
                include:[
                  {
                    model: Device,
                    as: "device"
                  }
                ]     
              },
              {
                model: ComputerSoftware,
                as: 'computerSoftware',
                include:[{
                  model: Software,
                  as: "software"
                }]
              }]           
            }]
          },
          {
            model: Support,
            as: "supports",
            include: [
              {
                model: User, 
                as: "user",
                attributes: ["user_id", "full_name"],
              },
            ],
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
