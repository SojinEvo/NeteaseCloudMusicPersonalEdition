<template>
  <div class="footer">
    <div class="center">
        <div class="left">
        <p><a href="https://st.music.163.com/official-terms/service">服务条款 &nbsp;&nbsp;|</a><a href="https://st.music.163.com/official-terms/privacy">&nbsp;&nbsp;隐私政策 &nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://st.music.163.com/official-terms/children">儿童隐私政策 &nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="#"> 意见反馈 &nbsp;&nbsp;|&nbsp;&nbsp;</a></p>
        <p>网易公司版权所有©1997-2020杭州乐读科技有限公司运营：&nbsp;&nbsp;<a href="https://p1.music.126.net/Mos9LTpl6kYt6YTutA6gjg==/109951164248627501.png">浙网文[2018]3506-263号</a></p>
        <p>违法和不良信息举报电话：0571-89853516 举报邮箱：&nbsp;&nbsp;<a href="#">ncm5990@163.com</a></p>
        <p>粤B2-20090191-18&nbsp;&nbsp;<a href="https://beian.miit.gov.cn/#/Integrated/index">工业和信息化部备案管理系统网站&nbsp;&nbsp;</a><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564">浙公网安备 33010902002564号</a></p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        // footer组件容易，所以别必要用for循环读取数据，这里直接写死。
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.footer {
  width: 100%;
  position: relative;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
  color: #666;
  font-size: 12px;
  padding-bottom: 1px;

}

.footer .center {
    margin: 20px auto;
}

a{
color: #999;;
}
</style>
