export const isNotDemo = (req, res, next) => {
  if (req.user?.isDemo) {
    return res.status(403).json({
      success: false,
      message: "Demo account is read-only",
    });
  }
  next();
};
