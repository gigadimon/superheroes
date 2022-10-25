class HeroError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ConflictError extends HeroError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class ValidationError extends HeroError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFoundError extends HeroError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  HeroError,
  ConflictError,
  ValidationError,
  NotFoundError,
};
