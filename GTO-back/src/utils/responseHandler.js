
exports.successResponse = (res, message, data, status = 200) => {
    res.status(status).json({ success: true, message, data });
};

exports.errorResponse = (res, message, error = null, status = 500) => {
    res.status(status).json({ success: false, message, error });
};

