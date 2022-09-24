<template>

</template>

<script>
import {TutorialsApiService} from "@/learning/services/tutorials-api.service";
import {FilterMatchMode} from "primevue/api";

export default {
  name: "tutorial-list",
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
        {label: "Published", value: "published"},
        {label: "Unpublished", value: "unpublished"},
      ],
      tutorialService: null,
    }
  },
  //it initializes everything
  created() {
    this.tutorialService = new TutorialsApiService();
    this.tutorialService.getAll()
        .then((response) =>{
          this.tutorials = response.data;
          console.log(this.tutorials);
          this.tutorials.forEach((tutorial)=>
            this.getDisplayableTutorial(tutorial));
          console.log(this.tutorials);
        });
        this.initFilters();
    },
  methods: {
    getDisplayableTutorial(tutorial){
      tutorial.status = tutorial.published
      ? this.statuses[0].label
          : this.statuses[1].label;
      return tutorial;
    },
    getStorableTutorial(displayableTutorial){
        return {
          id: displayableTutorial.id,
          title: displayableTutorial.title,
          description: displayableTutorial.description,
          published : displayableTutorial.status.label === "Published",
        };
    },
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
      return this.tutorial.findIndex((tutorial) => tutorial.id === id);
    },
    saveTutorial() {
      this.submitted = true;
      if (this.tutorial.title.trim()) {
        //this is a tutorial update
        if (this.tutorial.id) {
          this.tutorialService.update(this.tutorial.id, this.tutorial)
              .then((response) => {
                this.tutorials[this.tutorial.findIndex(response.id)] = this.getDisplayableTutorial(response.data);
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
                this.tutorial = this.getDisplayableTutorial(response.data);
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
    },
    exportToCSV(){
      this.$refs.dt.exportToCSV();
    },
    confirmDeleteSelected(){
        this.deleteTutorialDialog = true;
    },
    deleteSelectedTutorials(){
      this.selectTutorials.forEach((tutorial)=>{
          this.tutorialService.delete(tutorial.id)
              .then((response)=>{
              this.tutorials = this.tutorials.filter(
                  (t) => t.id !== this.tutorial.id
              );
              console.log(response);
          } );
      } );
      this.deleteTutorialDialog = false;
    },

    initFilters(){
      this.filters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS}
      }
    }

  },
};
</script>

<style scoped>

</style>