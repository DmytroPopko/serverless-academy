class GOIT26NodeError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends GOIT26NodeError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends GOIT26NodeError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorrizedError extends GOIT26NodeError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ValidationError,
  WrongParametersError,
  NotAuthorrizedError,
  GOIT26NodeError
};
