<template>
    <div class="task">
        <div class="task_top">
            <template v-if="active==1">
                <img @click="actives(1)" src="../../../assets/img/task-1-2.png" alt="">
            </template>
            <template v-else>
                <img @click="actives(1)" src="../../../assets/img/task-1-1.png" alt="">
            </template>
            <template v-if="active==2">
                <img @click="actives(2)" src="../../../assets/img/task-2-2.png" alt="">
            </template>
            <template v-else>
                <img @click="actives(2)" src="../../../assets/img/task-2-1.png" alt="">
            </template>
            <template v-if="active==3">
                <img @click="actives(3)" src="../../../assets/img/task-3-2.png" alt="">
            </template>
            <template v-else>
                <img @click="actives(3)" src="../../../assets/img/task-3-1.png" alt="">
            </template>
            <template v-if="active==4">
                <img @click="actives(4)" src="../../../assets/img/task-4-2.png" alt="">
            </template>
            <template v-else>
                <img @click="actives(4)" src="../../../assets/img/task-4-1.png" alt="">
            </template>
        </div>
        <div class="task_bottom">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'task',
    data () {
        return {
            active:4,
        }
    },
    mounted(){
        
    },
    methods:{
        actives(val){
            this.active = val;
            if(val=='1'){this.$router.push({'path':'/patrolItem'})}
            if(val=='2'){this.$router.push({'path':'/InspectionSite'})}
            if(val=='3'){this.$router.push({'path':'/InspectionRoute'})}
            if(val=='4'){this.$router.push({'path':'/PatrolPlan'})}
        }
    },
    created(){
        this.actives(4)
    }
}
</script>
<style scoped>
.task{width: 100%;height:100%;}
.task_top{width: 100%;height: 40px;background: #f5f7fa;position: relative;display: flex;justify-content: center;align-items: center;}
.task_top>img{width: 175px;margin-right: 20px;}
.task_bottom{width: 100%;width: 100%;position: absolute;top: 45px;bottom: 0;}
</style>