const jwt = require("jsonwebtoken");
const { forbidden, unauthorized } = require("../handlers/response_handler");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../../variables/global");
const { User } = require("../../models");
const { omitPassword } = require("../helper/user");


const generateToken = (userData, refreshToken = false) => {
	const tokenType = refreshToken ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET;
	const tokenExpire = refreshToken ? "30d" : "1h";
	const token = jwt.sign(userData, tokenType, { expiresIn: tokenExpire });
	return token;
};

const refreshNewToken = async (req) => {
	try {
	  const refreshToken = req.cookies.refreshToken;
	  if (!refreshToken) {
		return "login_required";
	  }
  
	  const decodedRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
	  const userId = decodedRefreshToken.id;
  
	  const user = await User.findById(userId);
	  if (!user || user.refreshToken !== refreshToken) {
		return null;
	  }
  
	  let userData = omitPassword(user);
	  const newAccessToken = generateToken(userData, false);  // Tạo token mới
	  return newAccessToken;  // Trả về token mới
	} catch (err) {
	  if (err instanceof jwt.TokenExpiredError) {
		return "login_required";
	  }
	  return null;
	}
  };
  


const checkAuthAndRole = (requiredRole = []) => {
  return async (req, res, next) => {
    // Lấy token từ `Authorization` header
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    
    if (!token) {
      return unauthorized(res); // Trả về lỗi nếu không có token
    }

    try {
      // Xác thực token
      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

      // Lấy role và id từ token đã xác thực
      const accountRole = decoded.role;
      const accountId = decoded.id;

      // Kiểm tra quyền truy cập dựa trên role của người dùng
      if (requiredRole.includes(accountRole)) {
        req.accountRole = accountRole; // Gán role vào request để sử dụng sau
        req.accountId = accountId;     // Gán id vào request để sử dụng sau
        next(); // Tiếp tục xử lý request nếu hợp lệ
      } else {
        return forbidden(res); // Trả về lỗi nếu không có quyền truy cập
      }
    } catch (err) {
      // Token không hợp lệ hoặc hết hạn
      if (err.name === "TokenExpiredError") {
        return unauthorized(res); // Token hết hạn
      }
      return forbidden(res); // Token không hợp lệ
    }
  };
};

  

module.exports = {
	checkAuthAndRole,
	generateToken,
	refreshNewToken,
};
