<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text="Home"></Label>
    </ActionBar>

    <StackLayout>
      <ScrollView orientation="vertical" height="100%">
        <ListView for="contact in contacts" class="list-group">
          <v-template>
            <GridLayout class="list-group-item" rows="auto,auto">
              <Label :text="contact.name.given" />
            </GridLayout>
          </v-template>
        </ListView>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import Permissions from "nativescript-permissions";
import contacts from "nativescript-contacts";

export default {
  data() {
    return {
      contacts: [],
    };
  },
  created() {
    this.getAllContacts();
    this.log();
  },
  methods: {
    getAllContacts() {
      this.requestPermission(() => {
        const contactFields = ["name", "phoneNumbers"];

        contacts
          .getAllContacts(contactFields)
          .then((args) => {
            this.contacts = args.data;
          })
          .catch((err) => {
            console.log("ERROR: ", err);
          });
      });
    },

    requestPermission(action) {
      Permissions.requestPermission(
        android.Manifest.permission.READ_CONTACTS,
        "I need these permissions to work with your contacts."
      )
        .then(() => {
          console.log("Permission has been granted. Proceeding to: " + action);
          action();
        })

        .catch(() => {
          console.log("Uh oh! No permissions have been granted!");
        });
    },
    log() {
      console.log("does logging this.contacts work: " + this.contacts);
    },
  },
};
</script>

<style scoped lang="scss">
// Custom styles

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
