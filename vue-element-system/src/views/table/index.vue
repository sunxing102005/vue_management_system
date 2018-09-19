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

          <el-col :offset="5" :span="6">
            <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
            <el-button type="primary" @click="addUser">新增</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          :data="tableList"
          border :row-class-name="tableRowClassName"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="200" v-if="showId">
          </el-table-column>
          <el-table-column
            prop="XH"
            label="序号"
            width="200">
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
            label="状态">
            <template slot-scope="scope">
                <el-button :type="scope.row.STATUS|ztFilter" size="mini" >{{scope.row.STATUS==1?'启用':'禁用'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="edit(scope.$index,scope.row)" >编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteUserMan(scope.$index,scope.row.ID)">删除</el-button>
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
        <!--上传-->
            <upload :showdia="uploadVisible" @upload="toggleupload" @confirm="confirmFile" :tempFile="tempFile"></upload>
        <!-- 编辑对话框 -->
        <el-dialog
          :title="winTitle"
          :visible.sync="dialogVisible"
          width="40%">
          <el-form ref="form" :model="temp" label-width="80px" :rules="rules" >
            <el-row>
              <el-col :span="11">
                <el-form-item label="序号" prop="XH">
                  <el-input v-model="temp.XH" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="姓名" prop="CNAME">
                  <el-input v-model="temp.CNAME"  @click.native="tname" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="阅读数" prop="VISITNUM">
                  <el-input v-model="temp.VISITNUM" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="时间" prop="birth">
                  <el-date-picker v-model="temp.BIRTH" name="BIRTH" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%" ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="temp.TITLE" name="TITLE"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="状态">
                  <el-select v-model="temp.STATUS" placeholder="请选择状态"  >
                    <el-option v-for="op in status" :label="op.label" :value="op.statusId" :key="op.statusId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="文件" prop="title">
                  <a name="TITLE" class="filename" @click="downloadFile(temp.FILE.newFileName,temp.FILE.oldFileName)"> {{temp.FILE?temp.FILE.oldFileName:''}}</a>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
            <el-button type="success" @click="toggleupload">上传</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getList, updateUserManage ,deleteUserManage,downloadFile} from '@/api/table'
import upload from '@/components/upload/upload';
import dowloadUtil from '@/utils/downloadUtil'
// import '@/webSocket/wsClient2'
export default {
    name: 'vTable',
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
      uploadVisible:false,
      rules:{
          CNAME:[{required:true,trigger:'blur',validator:validateXm}],
          XH:[{required:true,trigger:'blur',validator:valiadateXh}],
          VISITNUM:[{required:true,trigger:'blur',validator:valiadateXh}]
      },
      temp: {
        id:'',
        xh: '',
        cname: '',
        birth: '',
        visitnum:'',
        status: ''
      },
      tempFile:{},
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
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
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
    upload
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
    tname(){
        debugger
      },
    downloadFile(filename,oldname){
      dowloadUtil(`${process.env.BASE_API}/table/downloadFile?filename=${filename}&oldname=${oldname}`);
    },
    confirmFile(file){
      this.temp['FILE']=file;
      this.temp['newfilename'] = file.newFileName;
      this.temp['oldfilename'] = file.oldFileName;
      this.temp['attid'] = file.attId;

    },
    toggleupload(){
      this.uploadVisible = !this.uploadVisible;
      // if(this.uploadVisible&&this.temp['FILE'].attId){
      //   this.tempFile = this.temp['FILE'];
      // }
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
            if(res.flag){
              if(this.temp.ID!=-1){
                for(let row of this.tableList){
                  if(row.ID==tmp.ID){

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
              this.dialogVisible = false;
              this.$message.error('保存失败!');
              this.changePage(1);
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
        ID:'-1',
        XH: '',
        CNAME: '',
        BIRTH: '',
        VISITNUM:'',
        STATUS: '',
        FILE:{}
      };

    },
    deleteUserMan(index,id){
      let ids ={ids:id};
      this.$confirm('确定删除该记录?','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消'
      }).then(()=>{
          deleteUserManage(ids).then(response=>{
            let flag = response.flag;
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
      this.winTitle = '修改';
      this.temp = Object.assign({}, row);
      if(this.temp.attid){
        this.temp['FILE']={
          newFileName:this.temp.newfilename,
          oldFileName:this.temp.oldfilename,
          attId:this.temp.attid
        }
      }
      this.dialogVisible = true;
    },
    fetchData(){
      const param = {
        title:this.cname,
        status:this.selectedZt
      };
      getList(param).then(response=>{
        const flag = response.flag ;
        let data =[];
        let res = [];
        if(flag){
          res = response.data;
          data = res.filter((row,index)=>{
            let bl =index>=((this.page-1)*this.pageSize)&&index<this.page*this.pageSize
            return bl;
          });
        }else{
          this.$message.error({
            message: '查询失败'
          });
        }

        this.tableList =data;
        this.total = res.length;
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
  .filename{
    transition: all 200ms linear;
  }
  .filename:hover{
    color:aquamarine;
  }
</style>
