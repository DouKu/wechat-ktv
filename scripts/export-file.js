import '../nconf'
import '../mongoose'
import mongoose from 'mongoose'
import xlsx from 'node-xlsx'
import { findUsers } from '../services/core/user-service'
import { findChorus } from '../services/core/chorus-service'

const exportUser = async () => {
  let users = await findUsers({})
  let filename = '用户信息' + Date.now()
  let sheet = [
    ['序号', '微信昵称', '性别', '用户填写的姓名', '电话号码']
  ]
  users.forEach((item) => {
    console.log(item)
  })
  UserReportsService.userReportsSearch(condition, function (err, result) {
      if (err) {
        res.json({code: 503, error: err});
      } else {
        var currentTime = moment().format('YYMMDDHHmmss');
        var filename = currentTime + "考核汇总表.xlsx";
        var sheet = [
          ['序号', '部门/组', '姓名', '职位', '考核得分', '备注']
        ];
        // console.log(sheet);
        
        _.each(result, function (item, key) {
          var department_name;
          var user_name;
          var report_title;
          var user_position;
          if (item.department && item.department.name) {
            department_name = item.department.name;
          }
          if (item.user && item.user.name) {
            user_name = item.user.name;
          }
          if (item.user && item.user.position) {
            user_position = item.user.position;
          }
          var data = [
            key + 1,
            department_name,
            user_name,
            user_position,
            item.final_point,
            null
          ];
          sheet.push(data);
        });
        //生成表
        var buffer = xlsx.build([{name: "sheet1", data: sheet}]);
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set("Content-Disposition", "attachment;filename=" + encodeURIComponent(filename));
        res.end(buffer);
      }
    });
  },
}

exportUser()