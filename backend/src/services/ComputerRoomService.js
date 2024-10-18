// services/ComputerRoomService.js

const { ComputerRoom, Computer, ComputerType, ComputerTypeDevice, ComputerTypeSoftware, ComputersDevices, ComputerSoftware, IncidentReport, Support, User, Device, Software, ReportDetail } = require("../../models");

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
    const { room_name, numberOfComputers, computerType, supportStaff } = data;

    // try {
      // 1. Create a new room
      // const newRoom = await ComputerRoom.create({ room_name });

      // 2. Fetch the ComputerType configuration by the provided ID
      const computerTypeConfig = await ComputerType.findByPk(computerType, {
        include: [
          {
            model: ComputerTypeDevice,
            as: 'computerTypeDevices',
          },
          {
            model: ComputerTypeSoftware,
            as: 'computerTypeSoftware',
          },
        ],
      });

      console.log(computerTypeConfig)
  
      if (!computerTypeConfig) {
        return res.status(404).json({ error: 'Computer type not found' });
      }
  
      // 3. Create new computers based on the fetched configuration
      const computers = [];
      for (let i = 0; i < numberOfComputers; i++) {
        // Create a new computer in the room
        const newComputer = await Computer.create({
          computer_name: `${room_name} - Computer ${i + 1}`, // Name each computer uniquely
          room_id: newRoom.room_id
        });
        computers.push(newComputer);
  
        // 4. Clone devices from the template and set their status to 'Installing'
        for (const deviceTemplate of computerTypeConfig.computerTypeDevices) {
          await ComputersDevices.create({
            computer_id: newComputer.computer_id,
            device_id: deviceTemplate.device_id,
            status: 'Installing' // Set status to Installing
          });
        }
  
        // 5. Clone software from the template and set their status to 'Installing'
        for (const softwareTemplate of computerTypeConfig.computerTypeSoftware) {
          await ComputerSoftware.create({
            computer_id: newComputer.computer_id,
            software_id: softwareTemplate.software_id,
            status: 'Installing' // Set status to Installing
          });
        }
      }
  
      // Return the created room and its computers
      // res.status(201).json({
      //   message: `Room ${room_name} created successfully with ${numberOfComputers} computers.`,
      //   room: newRoom,
      //   computers
      // });
      res.status(201).json();
       
    // } catch (error) {
    //   res.status(500).json({ error: error.message });
    // }
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
