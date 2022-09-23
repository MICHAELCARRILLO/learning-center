<template>

</template>

<script>
import {TutorialsApiService} from "@/learning/services/tutorials-api.service";

export default {
  name: "tutorials",
  data() {
    return {
      tutorials: [],
      tutorialDialog: false,
      deleteTutorialDialog: false,
      deleteTutorialsDialog: false,
      tutorial: {},
      selectTutorials: null,
      filters: {},
      submitted: false,
      statuses: [
        {label: "Published", value: true},
        {label: "Unpublished", value: false},
      ],
      tutorialService: new TutorialsApiService(),
    }
  },

  methods: {
    openNew() {
      this.tutorial = {};
      this.submitted = false;
      this.tutorialDialog = true;
    },
    hideDialog() {
      this.tutorialDialog = false;
      this.submitted = false;
    },
    findIndexById(id) {
      return this.tutorial.findIndex((tutorial) => tutorial.id == id);
    },
    saveTutorial() {
      this.submitted = true;
      if (this.tutorial.title.trim()) {
        //this is a tutorial update
        if (this.tutorial.id) {
          this.tutorialService.update(this.tutorial.id, this.tutorial)
              .then((response) => {
                this.tutorials[this.tutorial.findIndex(this.tutorial.id)] = this.tutorial;
                this.$toast.add({
                  severity: "success",
                  summary: "Successful",
                  details: "Tutorial Updated",
                  life: 3000,
                });
                console.log(response);
              });
        }
        //this is a new tutorial, because id doesn't exist
        else {
          this.tutorial.id = 0;
          this.tutorial.create(this.tutorial)
              .then((response) => {
                this.tutorial.id = response.data.id;
                this.tutorials.push(this.tutorial);
                this.$toast.add({
                  severity: "success",
                  summary: "Successful",
                  details: "Tutorial Created",
                  life: 3000,
                });
                console.log(response);
              });
        }
      }
      this.tutorialDialog = false;
      this.tutorial = {};
    },
    editTutorial(tutorial) {
      this.tutorial = {...tutorial};
      this.tutorialDialog = true;
    },
    confirmDeleteTutorial(tutorial) {
      this.tutorial = tutorial;
      this.deleteTutorialDialog = true;
    },
    deleteTutorial() {
      this.tutorialService.delete(this.tutorial.id)
          .then((response) => {
            this.tutorials = this.tutorials.filter(
                (t) => t.id !== this.tutorial.id
            );
            this.deleteTutorialDialog = false;
            this.tutorial = {};
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              details: "Tutorial Deleted",
              life: 3000,
            });
            console.log(response);
          });
    }
  }
}
</script>

<style scoped>

</style>