<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-row>
          <el-col :offset="0" :span="4">
            <el-input v-model="cname" placeholder="姓名"></el-input>
          </el-col>
          <el-col :offset="1" :span="5">
            <el-select v-model="selectedZt" placeholder="状态" clearable >
              <el-option v-for="op in status" :label="op.label" :value="op.statusId" :key="op.statusId"></el-option>
            </el-select>
          </el-col>

          <el-col :offset="9" :span="4">
            <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
            <el-button type="primary" @click="test">新增</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          :data="tableList"
          border :row-class-name="tableRowClassName"
          style="width: 100%">
          <el-table-column
            prop="ID"
            label="ID"
            width="200" v-if="showId">
          </el-table-column>
          <el-table-column
            prop="XH"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="CNAME"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="VISITNUM"
            label="阅读数">
          </el-table-column>
          <el-table-column
            prop="BIRTH"
            label="时间">
          </el-table-column>
          <el-table-column
            label="标题" >
            <template slot-scope="scope">
              <el-input v-show="scope.row.EDIT" with="150px" v-model="scope.row.TITLE"></el-input>
              <span v-show="!scope.row.EDIT">{{scope.row.TITLE}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-button :type="scope.row.STATUS|ztFilter" size="mini" >{{scope.row.STATUS==1?'启用':'禁用'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作" width="300">
            <template slot-scope="scope">
              <!--<el-button type="primary" size="mini" @click="edit(scope.$index,scope.row)" >编辑</el-button>-->
              <el-button type="primary" size="mini" @click="scope.row.EDIT=true"  v-show="!scope.row.EDIT" >编辑标题</el-button>
              <el-button type="success" size="mini" @click="submitTitle(scope.row,scope.$index)"  v-show="scope.row.EDIT" >完成编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteUserMan(scope.$index,scope.row.ID)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Drag" width="80">
            <template slot-scope="scope">
              <svg-icon class="drag-handler" icon-class="drag"/>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePage"
          :total="total" :page-size="pageSize">
        </el-pagination>

        <!-- 编辑对话框 -->
        <el-dialog
          :title="winTitle"
          :visible.sync="dialogVisible"
          width="40%">
          <el-form ref="form" :model="temp" label-width="80px" :rules="rules" >
            <el-row>
              <el-col :span="11">
                <el-form-item label="序号" prop="xh">
                  <el-input v-model="temp.xh" name="xh"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="姓名" prop="cname">
                  <el-input v-model="temp.cname" name="cname" autoComplete="on"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="阅读数" prop="visitnum">
                  <el-input v-model="temp.visitnum" name="visitnum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="时间" prop="birth">
                  <el-date-picker v-model="temp.birth" name="birth" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%" ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="temp.title" name="title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="状态">
                  <el-select v-model="temp.status" placeholder="请选择状态"  >
                    <el-option v-for="op in status" :label="op.label" :value="op.statusId" :key="op.statusId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { getList, updateUserManage ,deleteUserManage} from '@/api/table'
  import sortable from 'sortablejs'
  export default {
    name: 'vTable',
    mounted(){
      //使得表格可以拖拽

    },
    data() {
      const valiadateXh = (rule,value,callback)=>{
        if(isNaN(value)||value==''){
          callback(new Error('必须为数字!'));
        }else{
          callback();
        }
      }
      const validateXm =(rule,value,callback)=>{
        if(value.length>20){
          callback(new Error('名字长度必须小于10!'));
        }else if(value.length<2){
          callback(new Error('名字长度必须大于2!'));
        }else{
          callback();
        }
      }

      return {
        tableList: [],
        selectedJg:'',
        selectedZt:'',
        account:'',
        cname:'',
        dialogVisible:false,
        rules:{
          cname:[{required:true,trigger:'blur',validator:validateXm}],
          xh:[{required:true,trigger:'blur',validator:valiadateXh}],
          visitnum:[{required:true,trigger:'blur',validator:valiadateXh}]
        },
        temp: {
          id:'',
          xh: '',
          cname: '',
          birth: '',
          visitnum:'',
          status: ''
        },
        total: 0,
        page: 1,
        pageSize: 10,
        status: [
          {
            statusId: "1",
            label: '启用'
          }, {
            statusId: "2",
            label: '禁用'
          }
        ],
        value: '',
        searchName: '',
        showId:false,
        filterTableDataEnd: [],
        winTitle:''
      }
    },
    created() {
      this.fetchData()
    },
    components:{

    },
    filters: {
      ztFilter(val){
        const ztMap = {
          1:'success',
          2:'danger'
        }
        return ztMap[val];
      }
    },
    methods: {
      test(){
        let _self = this;
        const row = _self.tableList.splice(0,1)[0];
        _self.tableList.splice(1,0,row);
      },
      submitTitle(row,index){
        row.EDIT = false;
        updateUserManage(row).then((rep)=>{

          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 500
          })
        })
      },
      editTitle(row){
        row.EDIT = true;
      },
      tableRowClassName({row,rowIndex}){
        if(rowIndex%2!=0){
          return 'success-row';
        }
        return '';
      },
      changePage(pageIndex){
        this.page = pageIndex;
        this.fetchData();
      },
      update(){
        this.$refs.form.validate(valid=>{
          if(valid){
            const tmp = Object.assign({},this.temp);
            updateUserManage(tmp).then(res=>{
              var flag = res.data.flag;
              if(flag){
                if(this.temp.id!=-1){
                  for(let row of this.tableList){
                    if(row.id==tmp.id){
                      let index = this.tableList.indexOf(row);
                      this.tableList.splice(index,1,tmp);
                      break;
                    }
                  }
                }else{
                  this.changePage(1);
                }

                this.dialogVisible = false;
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  duration: 2000
                })
              }else{
                this.$message.error('保存出错!');
              }

            })
          }else{
            this.$message.error('表单验证出错!');
          }

        })



      },
      addUser(){
        this.dialogVisible = true;
        this.winTitle = '新增';
        this.temp = {
          id:'-1',
          xh: '',
          cname: '',
          birth: '',
          visitnum:'',
          status: ''
        };

      },
      deleteUserMan(index,id){
        let ids ={ids:id};
        this.$confirm('确定删除该记录?','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消'
        }).then(()=>{
          deleteUserManage(ids).then(response=>{
            let flag = response.data;
            if(flag){
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 2000
              });
              // this.tableList.splice(index,1);
              this.changePage(1);
            }else{
              this.$message.error({
                message: '删除失败'
              });
            }
          })
        }).catch();

      },
      edit(index,row){
        // this.temp = row;
        this.winTitle = '修改';
        this.temp = Object.assign({}, row)
        this.dialogVisible = true;
      },
      sortTable(){
        let el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
        let _self = this;
        let sort = sortable.create(el,{
          ghostClass: 'sortable-ghost',
          setData: function(dataTransfer) {
            dataTransfer.setData('Text', '')
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          },
          onEnd:(evt)=>{
            let tt = _self.tableList;
            debugger
            const row = _self.tableList.splice(evt.oldIndex,1)[0];
            _self.tableList.splice(evt.newIndex,0,row);
          }
        });
      },
      fetchData(){
        const param = {
          title:this.cname,
          status:this.selectedZt
        };
        getList(param).then(response=>{
          const res = response.data;

          const data = res.filter((row,index)=>{
            let bl =index>=((this.page-1)*this.pageSize)&&index<this.page*this.pageSize
            return bl;
          });
          this.tableList =data;
          this.total = res.length;
          this.$nextTick(()=>{
            this.sortTable();
          })
        })
      }
    }
  }
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background-color: azure;
  }
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
</style>
