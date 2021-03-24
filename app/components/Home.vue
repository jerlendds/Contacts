<template>
    <Page class="page" actionBarHidden="true">
        <StackLayout orientation="vertical">
            <GridLayout rows="26, 40" columns="40,4*,1*" height="76">
                <Button row="1" col="0" @tap="fuck" class="rbtn">
                    <FormattedString>
                        <Label
                            hint="Settings"
                            class="fas"
                            text.decode="&#xf142;"
                        />
                    </FormattedString>
                </Button>
                <TextField
                    hint="Search contacts..."
                    class="search-field"
                    row="1"
                    col="1"
                />
                <Button row="1" col="2" @tap="fuck" class="rbtn">
                    <FormattedString>
                        <Label
                            hint="Settings"
                            class="fas"
                            text.decode="&#xf234;"
                        />
                    </FormattedString>
                </Button>
            </GridLayout>
            <StackLayout>
                <ScrollView orientation="vertical" height="100%">
                    <ListView for="contact in contacts" class="list-group">
                        <v-template>
                            <GridLayout
                                class="list-group-item"
                                rows="auto,auto"
                            >
                                <Label :text="contact.name.given" />
                            </GridLayout>
                        </v-template>
                    </ListView>
                </ScrollView>
            </StackLayout>
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
        alphabetizeContacts() {
            unorderedContacts = this.contacts;
        },

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
                    console.log(
                        "Permission has been granted. Proceeding to: " + action
                    );
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
.rbtn {
    border-color: transparent;
    border-width: 1;
    z-index: 0;
}

/* 
    File name: fa-regular-400.ttf 
    Font name: Font Awesome 5 Free
*/
.far {
    font-family: "Font Awesome 5 Free", "fa-regular-400";
    font-weight: 400;
}

/* 
    File name: fa-solid-900.ttf 
    Font name: Font Awesome 5 Free
*/
.fas {
    font-family: "Font Awesome 5 Free", "fa-solid-900";
    font-weight: 900;
}

// Custom styles
$bg: #0e3762;
$fg: #15416a;

.bg {
    background-color: $bg;
}

.search-field {
    color: #cad2ff;
    height: 46;
    font-size: 16;
    margin: 0;
    // background-color: $fg;
    border-bottom-width: 1;
    border-bottom-color: transparent;
}
</style>
