class Calorietracker{
    constructor (){
        this._calorieLimit=2000;
        this._totalCalories=0;
        this._meals=[];
        this._workouts=[];
        this._displayCaloriesLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
    //public methods
    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories+=meal.calories;
        this._render();
    }
    addWorkout(workouts){
        this._workouts.push(workouts);
        this._totalCalories-=workouts.calories;
        this._render();
    }
    //private methods
    _displayCaloriesTotal()
    {
        const totalCaloriesEl=document.getElementById('calories-total');
        totalCaloriesEl.innerHTML=this._totalCalories;
    }
    _displayCaloriesLimit()
    {
        const caloriesLimitEl=document.getElementById('calories-limit');
       caloriesLimitEl.innerHTML=this._calorieLimit;
    }

    _displayCaloriesConsumed(){
        const caloriesConsumedEl=document.getElementById('calories-consumed');
        const consumed=this._meals.reduce((total,meal)=>total+meal.calories,0);

        caloriesConsumedEl.innerHTML=consumed;
        }
     _displayCaloriesBurned(){
            const caloriesBurnedEl=document.getElementById('calories-burned');
            const burned=this._workouts.reduce((total,workout)=>total+workout.calories,0);
    
            caloriesBurnedEl.innerHTML=burned;
            }
     _displayCaloriesRemaining(){
                const caloriesRemainingEl=document.getElementById('calories-remaining');
                const remaining=this._calorieLimit-this._totalCalories;
                const progressEl=document.getElementById('calorie-progress');
        
              caloriesRemainingEl.innerHTML=remaining;
              if(remaining<=0){
                caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
                caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
                progressEl.classList.remove('bg-success');
                progressEl.classList.add('bg-danger');
              }
            
              
              else{
                caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
                caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
                progressEl.classList.remove('bg-danger');
                progressEl.classList.add('bg-success');
                    
              }

                }


        
_displayCaloriesProgress(){
const progressEl=document.getElementById('calorie-progress');
const percentage=(this._totalCalories/this._calorieLimit)*100;
const width=Math.min(percentage,100);
progressEl.style.width=`${width}%`;


}
    _render(){
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}
class Meal{
    constructor(name,calories){
        this.id=Math.random().toString(16).slice(2);
        this.name=name;
        this.calories=calories;
    }
}
class Workout{
    constructor(name,calories){
        this.id=Math.random().toString(16).slice(2);
        this.name=name;
        this.calories=calories;
    }
}

// const tracker=new Calorietracker();
// const breakfast=new Meal('Breakfast',300);
// tracker.addMeal(breakfast);
// const run =new Workout('Morning Run',320);
// tracker.addWorkout(run);
// console.log(tracker._meals);
// console.log(tracker._workouts);
// console.log(tracker._totalCalories);
class App{
    constructor(){
        this._tracker=new Calorietracker();
        document.getElementById('meal-form').addEventListener('submit',this._newMeal.bind(this))
    }
    _newMeal(e){
        e.preventDefault();
        const name=document.getElementById('meal-name');
        const calories=document.getElementById('meal-calories');
        //validation of input
        if(name.value==='' || calories.value===''){
            alert('Please fill in all fields');
            return;
        }
        const meal=new Meal(name.value,+calories.value);
        this._tracker.addMeal(meal);
        name.value='';
        calories.value='';


    }
}
const app=new App();