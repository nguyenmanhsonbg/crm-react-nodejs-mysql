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
	  const token = req.headers.authorization;
  
	  if (!token) {
		return unauthorized(res);
	  }
  
	  jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, decoded) => {
		if (err && err.name === "TokenExpiredError") {
		  // Nếu token hết hạn, thử làm mới token
		  const newToken = await refreshNewToken(req);
		  if (newToken === "login_required") {
			return unauthorized(res);
		  } else if (newToken) {
			req.headers.authorization = newToken;
		  } else {
			return unauthorized(res);
		  }
		} else if (err) {
		  return forbidden(res);  // Token không hợp lệ
		}
  
		// Token hợp lệ hoặc đã được làm mới
		const accountRole = decoded.role_id;
		const accountId = decoded.account_id;
  
		if (requiredRole.includes(accountRole)) {
		  req.accountRole = accountRole;
		  req.accountId = accountId;
		  next();  // Tiếp tục xử lý request
		} else {
		  return forbidden(res);  // Không có quyền truy cập
		}
	  });
	};
  };
  

module.exports = {
	checkAuthAndRole,
	generateToken,
	refreshNewToken,
};
