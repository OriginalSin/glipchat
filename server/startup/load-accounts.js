// configure first upperclass users
Meteor.startup(() => {
  if (Meteor.users.find().fetch().length === 0) {

    let users = Meteor.settings.admins || [
      {
        name: 'Manage-Users User',
        email: 'manage@example.com',
        roles: ['manage-users']
      },
      {
        name: 'Administrator',
        email: 'admin@example.com',
        roles: ['admin']
      },
    ];

    _.each(users, (user) => {

      let id = Accounts.createUser({
        email: user.email,
        password: user.password || 'apple1',
        profile: {name: user.name},
      });

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles, Roles.GLOBAL_GROUP);
      }
    });
  }
});
