# To-Do List

## Company (Model)
- [ ] Update and delete company endpoints
- [ ] Add tests for all endpoints
- [ ] Ensure all endpoints check the company ID and retrieve the company's data

## Invitation (Model)
- [ ] Update and delete invitation
- [ ] Ensure the invitation expires in 30 days
- [ ] Add tests for all endpoints

## Job (Model)
- [ ] Implement soft delete for jobs (add deleted date)
- [ ] Add tests for all endpoints

## Permission (Model)
- [ ] Implement user permissions (e.g., read, write, owner)
- [ ] Ensure all endpoints check user permissions and return an error if the user is not authorized

## Invoice (Model)
- [ ] Create functions for invoice
- [ ] Update functions for invoice
- [ ] Delete functions for invoice

## Notification
- [ ] Implement CRUD functions

## PermissionRequest
- [ ] Implement CRUD functions
- [ ] Check `permissionRequested` and `approvingUserId`, then update user permissions accordingly

## Quote
- [ ] Implement CRUD functions
- [ ] Include open, start, and end dates for quotes