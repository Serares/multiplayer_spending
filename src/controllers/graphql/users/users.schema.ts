export const resolver = {
  Query: {
    user(spending, args, context) {
      return context.services.users.get();
    },
  },
};
