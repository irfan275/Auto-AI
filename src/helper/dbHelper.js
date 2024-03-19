// Define a function to add pre-save middleware
function addCreatedByPreSave(schema) {
    schema.pre('save', function(next) {
      // Check if the document is being created (i.e., isNew is true) and createdBy field is not set
      if (this.isNew && !this.createdBy) {
        this.createdBy = ''; 
      }
      // Call the next middleware in the chain
      next();
    });
  }

  function addUpdatedByPreSave(schema) {
    schema.pre('save', function(next) {
      // document is being updated By current user
      // if (req && req.user) {
      //   this.updatedBy = ''; 
      // }
      // Call the next middleware in the chain
      next();
    });
  }
  module.exports = {
    addCreatedByPreSave,
    addUpdatedByPreSave
}