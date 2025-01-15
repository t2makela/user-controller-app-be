function solveSqlErrors (errors) {
    return errors.errors.map(error => error.path + ": " + error.message);
}

module.exports = { solveSqlErrors };