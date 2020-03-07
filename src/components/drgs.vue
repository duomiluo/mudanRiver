<template>
  <div>
    <header class="header left">
      <div class="left nav">
        <ul>
          <li>
            <i class="nav_1"></i>
            <a @click="nav('/home')">首页</a>
          </li>
          <li>
            <i class="nav_2"></i>
            <a @click="nav('/quota')">指标分析</a>
          </li>
          <li>
            <i class="nav_3"></i>
            <a @click="nav('/trend')">趋势分析</a>
          </li>
        </ul>
      </div>
      <div class="header_center left" style="position:relative">
        <h2>
          <strong>牡丹江市妇幼保健院 - 院长数据查询</strong>
        </h2>
      </div>
      <div class="right nav text_right" style="text-align:left">
        <ul>
          <li class="nav_active">
            <i class="nav_3"></i>
            <a @click="nav('/drgs')">DRGS首页</a>
          </li>
          <li>
            <i class="nav_4"></i>
            <a @click="nav('/yyqk')">医院运营情况</a>
          </li>
        </ul>
      </div>
    </header>
    <div class="app-title" style="background-color:#fff;background:#081832">
      <div class="mod-demo-echarts" style="width:98%;margin:0 auto;padding-top:120px;">
        <el-form :inline="true" :model="searchForm">
          <el-form-item>
            <el-input placeholder="险种" readonly v-model="searchForm.xianzhong">
              <el-button slot="append" icon="el-icon-search" @click="xianzhongRef()"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="科室" readonly v-model="searchForm.keshi">
              <el-button slot="append" icon="el-icon-search" @click="keshiRef()"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="searchForm.years"
              value-format="yyyy"
              type="year"
              placeholder="选择年"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.startmonth" style="width:80px" placeholder="开始月份">
              <el-option v-for="item in months" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.endmonth" style="width:80px" placeholder="结束月份">
              <el-option v-for="item in months" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select filterable clearable v-model="searchForm.FZQ_BBH" placeholder="DRGS数据">
              <el-option
                v-for="item in FZQ_BBHS"
                :key="item.fzqBbh"
                :label="item.fzqBbhmc"
                :value="item.fzqBbh"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select filterable clearable v-model="searchForm.DRGBG_JGFW" placeholder="标杆">
              <el-option
                v-for="item in DRGBG_JGFWS"
                :key="item.mc"
                :label="item.mc"
                :value="item.mc"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="find()">查询</el-button>
          </el-form-item>
        </el-form>
        <div v-loading="loadDataV">
          <el-row :gutter="10">
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(0)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.zpf.zpf}}</div>
                    <div class="grid-flag">
                      <span>
                        同期：
                        <!-- <icon-svg v-if="homeData.zpf.zpf<homeData.zpf.zpf_tq" name="down"></icon-svg> -->
                        <img src="../icons/equal.png" v-if="homeData.zpf.zpf<homeData.zpf.zpf_tq" />
                        <img src="../icons/equal.png" v-if="homeData.zpf.zpf==homeData.zpf.zpf_tq" />
                        <img src="../icons/equal.png" v-if="homeData.zpf.zpf>homeData.zpf.zpf_tq" />
                        {{homeData.zpf.zpf_tq}}
                      </span>
                    </div>
                    <div>总评分</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(1)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.drgs.drgs}}</div>
                    <div class="grid-flag">
                      <span>
                        标杆：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.drgs.drgs<homeData.drgs.drgs_bg"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.drgs.drgs==homeData.drgs.drgs_bg"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.drgs.drgs>homeData.drgs.drgs_bg"
                          name="up"
                        />
                        {{homeData.drgs.drgs_bg}}
                      </span>
                      <span>
                        同期：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.drgs.drgs<homeData.drgs.drgs_tq"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.drgs.drgs==homeData.drgs.drgs_tq"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.drgs.drgs>homeData.drgs.drgs_tq"
                          name="up"
                        />
                        {{homeData.drgs.drgs_tq}}
                      </span>
                    </div>
                    <div>DRGs组数</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(2)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.rzl.rzl}}</div>
                    <div class="grid-flag">
                      <span>
                        标杆：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.rzl.rzl<homeData.rzl.rzl_bg"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.rzl.rzl==homeData.rzl.rzl_bg"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.rzl.rzl>homeData.rzl.rzl_bg"
                          name="up"
                        />
                        {{homeData.rzl.rzl_bg}}
                      </span>
                      <span>
                        同期：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.rzl.rzl<homeData.rzl.rzl_tq"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.rzl.rzl==homeData.rzl.rzl_tq"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.rzl.rzl>homeData.rzl.rzl_tq"
                          name="up"
                        />
                        {{homeData.rzl.rzl_tq}}
                      </span>
                    </div>
                    <div>入组率%</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(3)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.cmi.cmi}}</div>
                    <div class="grid-flag">
                      <span>
                        标杆：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.cmi.cmi<homeData.cmi.cmi_bg"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.cmi.cmi==homeData.cmi.cmi_bg"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.cmi.cmi>homeData.cmi.cmi_bg"
                          name="up"
                        />
                        {{homeData.cmi.cmi_bg}}
                      </span>
                      <span>
                        同期：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.cmi.cmi<homeData.cmi.cmi_tq"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.cmi.cmi==homeData.cmi.cmi_tq"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.cmi.cmi>homeData.cmi.cmi_tq"
                          name="up"
                        />
                        {{homeData.cmi.cmi_tq}}
                      </span>
                    </div>
                    <div>CMI</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(4)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.sjxhzs.sjxhzs}}</div>
                    <div class="grid-flag">
                      <span>
                        标杆：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.sjxhzs.sjxhzs<homeData.sjxhzs.sjxhzs_bg"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.sjxhzs.sjxhzs==homeData.sjxhzs.sjxhzs_bg"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.sjxhzs.sjxhzs>homeData.sjxhzs.sjxhzs_bg"
                          name="up"
                        />
                        {{homeData.sjxhzs.sjxhzs_bg}}
                      </span>
                      <span>
                        同期：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.sjxhzs.sjxhzs<homeData.sjxhzs.sjxhzs_tq"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.sjxhzs.sjxhzs==homeData.sjxhzs.sjxhzs_tq"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.sjxhzs.sjxhzs>homeData.sjxhzs.sjxhzs_tq"
                          name="up"
                        />
                        {{homeData.sjxhzs.sjxhzs_tq}}
                      </span>
                    </div>
                    <div>时间消耗指数</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(5)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.fyxhzs.fyxhzs}}</div>
                    <div class="grid-flag">
                      <span>
                        标杆：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.fyxhzs.fyxhzs<homeData.fyxhzs.fyxhzs_bg"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.fyxhzs.fyxhzs==homeData.fyxhzs.fyxhzs_bg"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.fyxhzs.fyxhzs>homeData.fyxhzs.fyxhzs_bg"
                          name="up"
                        />
                        {{homeData.fyxhzs.fyxhzs_bg}}
                      </span>
                      <span>
                        同期：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.fyxhzs.fyxhzs<homeData.fyxhzs.fyxhzs_tq"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.fyxhzs.fyxhzs==homeData.fyxhzs.fyxhzs_tq"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.fyxhzs.fyxhzs>homeData.fyxhzs.fyxhzs_tq"
                          name="up"
                        />
                        {{homeData.fyxhzs.fyxhzs_tq}}
                      </span>
                    </div>
                    <div>费用消耗指数</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(6)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.dfxswl.dfxswl}}</div>
                    <div class="grid-flag">
                      <span>
                        标杆：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.dfxswl.dfxswl<homeData.dfxswl.dfxswl_bg"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.dfxswl.dfxswl==homeData.dfxswl.dfxswl_bg"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.dfxswl.dfxswl>homeData.dfxswl.dfxswl_bg"
                          name="up"
                        />
                        {{homeData.dfxswl.dfxswl_bg}}
                      </span>
                      <span>
                        同期：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.dfxswl.dfxswl<homeData.dfxswl.dfxswl_tq"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.dfxswl.dfxswl==homeData.dfxswl.dfxswl_tq"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.dfxswl.dfxswl>homeData.dfxswl.dfxswl_tq"
                          name="up"
                        />
                        {{homeData.dfxswl.dfxswl_tq}}
                      </span>
                    </div>
                    <div>低风险死亡率%</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(7)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.yzb.yzb}}</div>
                    <div class="grid-flag">
                      <span>
                        标杆：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.yzb.yzb<homeData.yzb.yzb_bg"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.yzb.yzb==homeData.yzb.yzb_bg"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.yzb.yzb>homeData.yzb.yzb_bg"
                          name="up"
                        />
                        {{homeData.yzb.yzb_bg}}
                      </span>
                      <span>
                        同期：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.yzb.yzb<homeData.yzb.yzb_tq"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.yzb.yzb==homeData.yzb.yzb_tq"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.yzb.yzb>homeData.yzb.yzb_tq"
                          name="up"
                        />
                        {{homeData.yzb.yzb_tq}}
                      </span>
                    </div>
                    <div>药占比</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(8)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.ypbhcyzb.ypbhcyzb}}</div>
                    <div class="grid-flag">
                      <span>
                        标杆：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.ypbhcyzb.ypbhcyzb<homeData.ypbhcyzb.ypbhcyzb_bg"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.ypbhcyzb.ypbhcyzb==homeData.ypbhcyzb.ypbhcyzb_bg"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.ypbhcyzb.ypbhcyzb>homeData.ypbhcyzb.ypbhcyzb_bg"
                          name="up"
                        />
                        {{homeData.ypbhcyzb.ypbhcyzb_bg}}
                      </span>
                      <span>
                        同期：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.ypbhcyzb.ypbhcyzb<homeData.ypbhcyzb.ypbhcyzb_tq"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.ypbhcyzb.ypbhcyzb==homeData.ypbhcyzb.ypbhcyzb_tq"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.ypbhcyzb.ypbhcyzb>homeData.ypbhcyzb.ypbhcyzb_tq"
                          name="up"
                        />
                        {{homeData.ypbhcyzb.ypbhcyzb_tq}}
                      </span>
                    </div>
                    <div>药品不含草药占比%</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(9)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.ypxhzs.ypxhzs}}</div>
                    <div class="grid-flag">
                      <span>
                        标杆：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.ypxhzs.ypxhzs<homeData.ypxhzs.ypxhzs_bg"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.ypxhzs.ypxhzs==homeData.ypxhzs.ypxhzs_bg"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.ypxhzs.ypxhzs>homeData.ypxhzs.ypxhzs_bg"
                          name="up"
                        />
                        {{homeData.ypxhzs.ypxhzs_bg}}
                      </span>
                      <span>
                        同期：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.ypxhzs.ypbhcyzb<homeData.ypxhzs.ypxhzs_tq"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.ypxhzs.ypbhcyzb==homeData.ypxhzs.ypxhzs_tq"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.ypxhzs.ypbhcyzb>homeData.ypxhzs.ypxhzs_tq"
                          name="up"
                        />
                        {{homeData.ypxhzs.ypxhzs_tq}}
                      </span>
                    </div>
                    <div>药品消耗指数</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(10)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.hcb.hcb}}</div>
                    <div class="grid-flag">
                      <span>
                        标杆：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.hcb.hcb<homeData.hcb.hcb_bg"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.hcb.hcb==homeData.hcb.hcb_bg"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.hcb.hcb>homeData.hcb.hcb_bg"
                          name="up"
                        />
                        {{homeData.hcb.hcb_bg}}
                      </span>
                      <span>
                        同期：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.hcb.hcb<homeData.hcb.hcb_tq"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.hcb.hcb==homeData.hcb.hcb_tq"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.hcb.hcb>homeData.hcb.hcb_tq"
                          name="up"
                        />
                        {{homeData.hcb.hcb_tq}}
                      </span>
                    </div>
                    <div>耗材比</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(11)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.clxhzs.clxhzs}}</div>
                    <div class="grid-flag">
                      <span>
                        标杆：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.clxhzs.clxhzs<homeData.clxhzs.clxhzs_bg"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.clxhzs.clxhzs==homeData.clxhzs.clxhzs_bg"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.clxhzs.clxhzs>homeData.clxhzs.clxhzs_bg"
                          name="up"
                        />
                        {{homeData.clxhzs.clxhzs_bg}}
                      </span>
                      <span>
                        同期：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.clxhzs.clxhzs<homeData.clxhzs.clxhzs_tq"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.clxhzs.clxhzs==homeData.clxhzs.clxhzs_tq"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.clxhzs.clxhzs>homeData.clxhzs.clxhzs_tq"
                          name="up"
                        />
                        {{homeData.clxhzs.clxhzs_tq}}
                      </span>
                    </div>
                    <div>材料消耗指数</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="4">
              <el-card>
                <div class="grid-content" @click="showMyChart(12)">
                  <div class="grid-cont-top">
                    <div class="grid-num">{{homeData.drgzzfl.drgzzfl}}</div>
                    <div class="grid-flag">
                      <span>
                        标杆：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.drgzzfl.drgzzfl<homeData.drgzzfl.drgzzfl_bg"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.drgzzfl.drgzzfl==homeData.drgzzfl.drgzzfl_bg"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.drgzzfl.drgzzfl>homeData.drgzzfl.drgzzfl_bg"
                          name="up"
                        />
                        {{homeData.drgzzfl.drgzzfl_bg}}
                      </span>
                      <span>
                        同期：
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.drgzzfl.drgzzfl<homeData.drgzzfl.drgzzfl_tq"
                          name="down"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.drgzzfl.drgzzfl==homeData.drgzzfl.drgzzfl_tq"
                          name="equal"
                        />
                        <img
                          src="../icons/equal.png"
                          v-if="homeData.drgzzfl.drgzzfl>homeData.drgzzfl.drgzzfl_tq"
                          name="up"
                        />
                        {{homeData.drgzzfl.drgzzfl_tq}}
                      </span>
                    </div>
                    <div>DRGs支付率</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-card>
                <div id="J_chartZpf" class="chart-box"></div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card>
                <div id="J_chartFy" class="chart-box"></div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card>
                <div id="J_chartZb" class="chart-box"></div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <!-- 险种参照 -->
        <xianzhongref v-if="xianzhongrefVisible" ref="xianzhongref" @getData="getXianzhongData"></xianzhongref>
        <!-- 科室参照 -->
        <keshiref v-if="keshirefVisible" ref="keshiref" @getData="getKeshiData"></keshiref>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import Xianzhongref from "./ref/xianzhong";
import Keshiref from "./ref/keshi";
export default {
  data() {
    return {
      months: [
        { name: "一月", id: "1" },
        { name: "二月", id: "2" },
        { name: "三月", id: "3" },
        { name: "四月", id: "4" },
        { name: "五月", id: "5" },
        { name: "六月", id: "6" },
        { name: "七月", id: "7" },
        { name: "八月", id: "8" },
        { name: "九月", id: "9" },
        { name: "十月", id: "10" },
        { name: "十一月", id: "11" },
        { name: "十二月", id: "12" }
      ],
      years: new Date().getYear(),
      loadDataV: false,
      xianzhongrefVisible: false,
      keshirefVisible: false,
      FZQ_BBHS: [],
      DRGBG_JGFWS: [],
      homeData: {
        zpf: {
          zpf: 0.0,
          zpf_tq: 0.0,
          zpf_bg: 0.0
        },
        drgs: {
          drgs: 0,
          drgs_tq: 0,
          drgs_bg: 0
        },
        rzl: {
          rzl: 0.0,
          rzl_tq: 0.0,
          rzl_bg: 0.0
        },
        cmi: {
          cmi: 0.0,
          cmi_tq: 0.0,
          cmi_bg: 0.0
        },
        sjxhzs: {
          sjxhzs: 0.0,
          sjxhzs_tq: 0.0,
          sjxhzs_bg: 0.0
        },
        fyxhzs: {
          fyxhzs: 0.0,
          fyxhzs_tq: 0.0,
          fyxhzs_bg: 0.0
        },
        dfxswl: {
          dfxswl: 0.0,
          dfxswl_tq: 0.0,
          dfxswl_bg: 0.0
        },
        yzb: {
          yzb: 0.0,
          yzb_tq: 0.0,
          yzb_bg: 0.0
        },
        ypbhcyzb: {
          ypbhcyzb: 0.0,
          ypbhcyzb_tq: 0.0,
          ypbhcyzb_bg: 0.0
        },
        ypxhzs: {
          ypxhzs: 0.0,
          ypxhzs_tq: 0.0,
          ypxhzs_bg: 0.0
        },
        hcb: {
          hcb: 0.0,
          hcb_tq: 0.0,
          hcb_bg: 0.0
        },
        clxhzs: {
          clxhzs: 0.0,
          clxhzs_tq: 0.0,
          clxhzs_bg: 0.0
        },
        drgzzfl: {
          drgzzfl: 0.0,
          drgzzfl_tq: 0.0,
          drgzzfl_bg: 0.0
        }
      },
      searchForm: {
        year: new Date().getYear() + "",
        startmonth:
          new Date().getMonth() + 1 < 10
            ? "0" + (new Date().getMonth() + 1)
            : new Date().getMonth() + 1 + "",
        endmonth:
          new Date().getMonth() + 1 < 10
            ? "0" + (new Date().getMonth() + 1)
            : new Date().getMonth() + 1 + "",
        xianzhong: "",
        xianzhongid: [],
        keshi: "",
        keshiid: [],
        FZQ_BBH: "",
        DRGBG_JGFW: ""
      },
      chartZpf: null,
      chartFy: null,
      chartZb: null
    };
  },
  mounted() {},
  components: {
    Xianzhongref,
    Keshiref
  },
  created() {
    this.init();
    if (this.chartZpf) {
      this.chartZpf.resize();
    }
  },
  methods: {
    nav(url) {
      this.$router.push({ path: url });
    },
    showMyChart(index) {
      this.chartZpf = echarts.init(document.getElementById("J_chartZpf"));
      var data = this.homeData;
      var option = null;
      switch (index) {
        case 0:
          option = this.getOption(
            data.zpf.text,
            data.zpf.subtext,
            data.zpf.legend,
            data.xAxis,
            data.zpf.series
          );
          break;
        case 1:
          option = this.getOption(
            data.drgs.text,
            data.drgs.subtext,
            data.drgs.legend,
            data.xAxis,
            data.drgs.series
          );
          break;
        case 2:
          option = this.getOption(
            data.rzl.text,
            data.rzl.subtext,
            data.rzl.legend,
            data.xAxis,
            data.rzl.series
          );
          break;
        case 3:
          option = this.getOption(
            data.cmi.text,
            data.cmi.subtext,
            data.cmi.legend,
            data.xAxis,
            data.cmi.series
          );
          break;
        case 4:
          option = this.getOption(
            data.sjxhzs.text,
            data.sjxhzs.subtext,
            data.sjxhzs.legend,
            data.xAxis,
            data.sjxhzs.series
          );
          break;
        case 5:
          option = this.getOption(
            data.fyxhzs.text,
            data.fyxhzs.subtext,
            data.fyxhzs.legend,
            data.xAxis,
            data.fyxhzs.series
          );
          break;
        case 6:
          option = this.getOption(
            data.dfxswl.text,
            data.dfxswl.subtext,
            data.dfxswl.legend,
            data.xAxis,
            data.dfxswl.series
          );
          break;
        case 7:
          option = this.getOption(
            data.yzb.text,
            data.yzb.subtext,
            data.yzb.legend,
            data.xAxis,
            data.yzb.series
          );
          break;
        case 8:
          option = this.getOption(
            data.ypbhcyzb.text,
            data.ypbhcyzb.subtext,
            data.ypbhcyzb.legend,
            data.xAxis,
            data.ypbhcyzb.series
          );
          break;
        case 9:
          option = this.getOption(
            data.ypxhzs.text,
            data.ypxhzs.subtext,
            data.ypxhzs.legend,
            data.xAxis,
            data.ypxhzs.series
          );
          break;
        case 10:
          option = this.getOption(
            data.hcb.text,
            data.hcb.subtext,
            data.hcb.legend,
            data.xAxis,
            data.hcb.series
          );
          break;
        case 11:
          option = this.getOption(
            data.clxhzs.text,
            data.clxhzs.subtext,
            data.clxhzs.legend,
            data.xAxis,
            data.clxhzs.series
          );
          break;
        case 12:
          option = this.getOption(
            data.drgzzfl.text,
            data.drgzzfl.subtext,
            data.drgzzfl.legend,
            data.xAxis,
            data.drgzzfl.series
          );
          break;
      }
      this.chartZpf.setOption(option);
      window.addEventListener("resize", () => {
        this.chartZpf.resize();
      });
    },
    init() {
      this.getDrgData();
    },
    getOption(text, subtext, legend, xAxis, series) {
      var option = {
        title: {
          text: text,
          subtext: subtext,
          left: "center",
          color: "#fff"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: ["本期", "同期", "同期比"],
          textStyle: { color: "#fff" }
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff" //左边线的颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "数量",
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff" //左边线的颜色
              }
            }
          },
          {
            type: "value",
            name: "百分比",
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff" //左边线的颜色
              }
            }
          }
        ],
        series: [
          {
            name: "本期",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "同期",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "同期比",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      };
      return option;
    },
    getDrgData() {
      // this.axios({
      //   url: "/drg/drgdatalist",
      //   method: "get"
      // }).then(({ data }) => {
      //   if (data && data.code === 0) {
      //     // console.log("获取drgdatalist数据", data.list);
      //     this.FZQ_BBHS = data.list;
      //     // this.FZQ_BBHS.forEach(item => {
      //     //   if (item.mrbz == 1) {
      //     //     this.searchForm.FZQ_BBH = item.fzqBbh;
      //     //   }
      //     // });
      //   } else {
      //     this.FZQ_BBHS = [];
      //   }
      //   this.$http({
      //     url: "/drg/bgjglist",
      //     method: "get"
      //   }).then(({ data }) => {
      //     if (data && data.code === 0) {
      //       // this.DRGBG_JGFWS = data.list;
      //       // this.DRGBG_JGFWS.forEach(item => {
      //       //   if (item.xzbz == 1) {
      //       //     this.searchForm.DRGBG_JGFW = item.mc;
      //       //   }
      //       // });
      //     } else {
      //       this.DRGBG_JGFWS = [];
      //     }
      //     this.find();
      //   });
      // });
      this.find();
    },
    find() {
      // this.loadDataV = true;
      const api = "/drg/home";
      this.axios({
        method: "get",
        url: api,
        params: {
          year: this.searchForm.year,
          startmonth: this.searchForm.startmonth,
          endmonth: this.searchForm.endmonth,
          xianzhongid: this.searchForm.keshiid.join(","),
          keshiid: this.searchForm.keshiid.join(","),
          FZQ_BBH: this.searchForm.FZQ_BBH,
          DRGBG_JGFW: this.searchForm.DRGBG_JGFW
        }
      })
        .then(({ data }) => {
          this.loadDataV = false;
          if (data && data.code === 0) {
            // this.homeData = data.data;
            // this.showMyChart(0);
            // this.initFy();
            // this.initZb();
          } else {
          }
        })
        .catch(() => {
          this.showMyChart(0);
          this.initFy();
          this.initZb();
        });
    },
    xianzhongRef() {
      this.xianzhongrefVisible = true;
      this.$nextTick(() => {
        this.$refs.xianzhongref.init(this.searchForm.xianzhongid);
      });
    },
    keshiRef() {
      this.keshirefVisible = true;
      this.$nextTick(() => {
        this.$refs.keshiref.init(this.searchForm.keshiid);
      });
    },
    getKeshiData(data) {
      if (data) {
        console.log(data);
        this.searchForm.keshi = "";
        this.searchForm.keshiid = [];
        data.forEach((item, index) => {
          this.searchForm.keshi = this.searchForm.keshi + item.name + ",";
          this.searchForm.keshiid.push(item.id);
        });
        this.searchForm.keshi = this.searchForm.keshi.slice(0, -1);
      }
    },
    getXianzhongData(data) {
      if (data) {
        this.searchForm.xianzhong = "";
        this.searchForm.xianzhongid = [];
        data.forEach((item, index) => {
          console.log(item);
          this.searchForm.xianzhong =
            this.searchForm.xianzhong + item.label + ",";
          this.searchForm.xianzhongid.push(item.id);
        });
        // this.searchForm.xianzhong = this.$string.removeLast(
        //   this.searchForm.xianzhong
        // );
      }
    },
    initFy() {
      this.chartFy = echarts.init(document.getElementById("J_chartFy"));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
            label: {
              formatter: function(params) {}
            }
          },
          formatter: function(params, ticket) {
            var htmlStr = "<div>";
            var sum = params[params.length - 1].value;
            for (var i = 0; i < params.length; i++) {
              if (i == params.length - 1) {
                htmlStr =
                  htmlStr + params[i].seriesName + ":" + params[i].value;
              } else {
                var rate = params[i].value / sum;
                htmlStr =
                  htmlStr +
                  params[i].seriesName +
                  ":" +
                  params[i].value +
                  "(" +
                  rate.toFixed(2) +
                  "%)<br>";
              }
            }
            var htmlStr = htmlStr + "</div>";
            return htmlStr;
          }
        },
        legend: {
          data: [
            "药品费用",
            "材料费用",
            "医疗费用",
            "医技费用",
            "护理费用",
            "管理费用"
          ],
          textStyle: {
            color: "#fff"
          },
          bottom: 10,
          left: "center"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["本期", "同期", "标杆"],
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff" //左边线的颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff" //左边线的颜色
              }
            }
          }
        ],
        series: [
          {
            name: "药品费用",
            type: "bar",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "材料费用",
            type: "bar",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "医疗费用",
            type: "bar",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "医技费用",
            type: "bar",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "护理费用",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570]
          },
          {
            name: "管理费用",
            type: "bar",
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          }
        ]
      };
      this.chartFy.setOption(option);
      window.addEventListener("resize", () => {
        this.chartFy.resize();
      });
    },
    initZb() {
      this.chartZb = echarts.init(document.getElementById("J_chartZb"));
      var data = this.homeData;
      var option = {
        title: {
          text: "DRGs指标对比",
          // left: "center",
          // top: "0"
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {},
        legend: {
          data: ["标杆", "本院"],
          textStyle: {
            color: "#fff"
          }
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "CMI", max: 6500 },
            { name: "DRG组数", max: 16000 },
            { name: "低风险死亡率", max: 30000 },
            { name: "费用消耗指数", max: 38000 },
            { name: "时间消耗指数", max: 52000 }
          ]
        },
        series: [
          {
            name: "标杆 vs 本院 ",
            type: "radar",
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "标杆"
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "本院"
              }
            ]
          }
        ]
      };
      this.chartZb.setOption(option);
      window.addEventListener("resize", () => {
        this.chartZb.resize();
      });
    }
  }
};
</script>

<style lang="scss">
.mod-demo-echarts {
  > .el-alert {
    margin-bottom: 10px;
  }
  > .el-row {
    margin-top: -10px;
    margin-bottom: -10px;
    .el-col {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .chart-box {
    min-height: 400px;
  }

  .el-row {
    margin-bottom: 20px;
  }
  .el-card__body {
    text-align: center;
    line-height: 1.5;
    border: 1px solid #034c6a;
    background-color: #034c6a;
    color: #fff;
  }
  .grid-flag img {
    vertical-align: middle;
  }
}
</style>
