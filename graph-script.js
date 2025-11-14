// graph-script.js - 超声成像知识图谱（ECharts实现）
document.addEventListener('DOMContentLoaded', () => {
    // 初始化ECharts实例
    const myChart = echarts.init(document.getElementById('graph-container'));

    // 知识图谱数据（基于PPT内容梳理）
    const graphData = {
        // 节点：分类为核心原理、设备结构、成像模式、物理特性、应用场景
        nodes: [
            // 核心原理（蓝色）
            { 
                name: "超声成像核心原理", 
                category: 0, 
                symbolSize: 60,
                desc: "基于超声波脉冲回波技术，利用超声波在组织界面的反射特性，通过电声转换实现成像，属于解剖学测量范畴" 
            },
            { 
                name: "压电效应", 
                category: 0, 
                symbolSize: 45,
                desc: "正压电效应（机械→电能）：接收回声；逆压电效应（电能→机械）：发射超声波，是换能器核心原理" 
            },
            { 
                name: "声阻抗差异", 
                category: 0, 
                symbolSize: 40,
                desc: "Z=ρ·c（密度×声速），组织界面声阻抗差>1‰时产生反射，是超声成像的物理基础" 
            },
            { 
                name: "脉冲回波技术", 
                category: 0, 
                symbolSize: 40,
                desc: "发射超声脉冲→接收组织反射回波→计算深度与强度→重建图像，是A/B/M型超声的共同技术基础" 
            },

            // 设备结构（绿色）
            { 
                name: "超声设备核心结构", 
                category: 1, 
                symbolSize: 55,
                desc: "由超声换能器（探头）、发射/接收电路、控制与图像处理系统三部分组成" 
            },
            { 
                name: "超声探头", 
                category: 1, 
                symbolSize: 45,
                desc: "含压电振子、阻尼吸声块、声透镜、匹配层，按阵元分单元/阵列探头，按用途分腹部/心脏/腔内探头" 
            },
            { 
                name: "发射/接收电路", 
                category: 1, 
                symbolSize: 40,
                desc: "发射电路：产生高压激励脉冲；接收电路：放大回波信号并转换为数字信号" 
            },
            { 
                name: "图像处理系统", 
                category: 1, 
                symbolSize: 40,
                desc: "实现波束合成、灰阶转换、动态聚焦，支持A/B/M/Doppler等多模式成像" 
            },

            // 成像模式（橙色）
            { 
                name: "主要成像模式", 
                category: 2, 
                symbolSize: 50,
                desc: "按显示方式分类，满足不同临床需求" 
            },
            { 
                name: "A型（幅度调制）", 
                category: 2, 
                symbolSize: 38,
                desc: "一维波形显示，横坐标为深度，纵坐标为回波幅度，用于器官测距（如颅脑占位）" 
            },
            { 
                name: "B型（辉度调制）", 
                category: 2, 
                symbolSize: 38,
                desc: "二维切面成像，光点亮度反映回波强度，实时显示脏器形态（如腹部、妇产检查）" 
            },
            { 
                name: "M型（时间-运动）", 
                category: 2, 
                symbolSize: 38,
                desc: "记录组织运动轨迹（如心脏瓣膜运动），横坐标为时间，纵坐标为深度，用于心血管疾病诊断" 
            },
            { 
                name: "Doppler型", 
                category: 2, 
                symbolSize: 38,
                desc: "利用多普勒效应检测血流，彩色多普勒显示方向/速度，用于心脏、血管疾病诊断" 
            },

            // 物理特性（紫色）
            { 
                name: "超声波物理特性", 
                category: 3, 
                symbolSize: 50,
                desc: "决定超声成像质量与适用范围" 
            },
            { 
                name: "频率（2-20MHz）", 
                category: 3, 
                symbolSize: 35,
                desc: "诊断用超声频率，频率越高分辨率越高但衰减越强（如浅表器官用高频，深部用低频）" 
            },
            { 
                name: "声速（1540m/s）", 
                category: 3, 
                symbolSize: 35,
                desc: "人体软组织平均声速，用于计算组织深度（深度=声速×时间/2）" 
            },
            { 
                name: "衰减特性", 
                category: 3, 
                symbolSize: 35,
                desc: "声能随传播距离减弱，骨>肌腱>肝>脂肪>血液，需STC/TGC补偿" 
            },

            // 应用场景（红色）
            { 
                name: "临床应用场景", 
                category: 4, 
                symbolSize: 50,
                desc: "无创、无辐射，适用于多系统检查" 
            },
            { 
                name: "腹部检查", 
                category: 4, 
                symbolSize: 35,
                desc: "肝、胆、胰、脾、肾等实质脏器，B型超声为主" 
            },
            { 
                name: "心血管检查", 
                category: 4, 
                symbolSize: 35,
                desc: "心脏结构与血流（M型+Doppler），血管狭窄/血栓（彩色Doppler）" 
            },
            { 
                name: "妇产检查", 
                category: 4, 
                symbolSize: 35,
                desc: "胎儿发育监测（B型/3D），妇科疾病诊断" 
            }
        ],
        // 关系：描述节点间关联
        links: [
            // 核心原理关联
            { source: "超声成像核心原理", target: "压电效应", value: 3 },
            { source: "超声成像核心原理", target: "声阻抗差异", value: 3 },
            { source: "超声成像核心原理", target: "脉冲回波技术", value: 3 },
            
            // 设备结构关联
            { source: "超声设备核心结构", target: "超声探头", value: 3 },
            { source: "超声设备核心结构", target: "发射/接收电路", value: 2 },
            { source: "超声设备核心结构", target: "图像处理系统", value: 2 },
            { source: "超声探头", target: "压电效应", value: 2 }, // 探头依赖压电效应
            
            // 成像模式关联
            { source: "主要成像模式", target: "A型（幅度调制）", value: 3 },
            { source: "主要成像模式", target: "B型（辉度调制）", value: 3 },
            { source: "主要成像模式", target: "M型（时间-运动）", value: 3 },
            { source: "主要成像模式", target: "Doppler型", value: 3 },
            { source: "主要成像模式", target: "脉冲回波技术", value: 2 }, // 模式依赖回波技术
            { source: "主要成像模式", target: "图像处理系统", value: 2 }, // 依赖图像处理
            
            // 物理特性关联
            { source: "超声波物理特性", target: "频率（2-20MHz）", value: 3 },
            { source: "超声波物理特性", target: "声速（1540m/s）", value: 3 },
            { source: "超声波物理特性", target: "衰减特性", value: 3 },
            { source: "频率（2-20MHz）", target: "超声探头", value: 2 }, // 探头决定频率
            { source: "声速（1540m/s）", target: "脉冲回波技术", value: 2 }, // 声速用于深度计算
            
            // 应用场景关联
            { source: "临床应用场景", target: "腹部检查", value: 3 },
            { source: "临床应用场景", target: "心血管检查", value: 3 },
            { source: "临床应用场景", target: "妇产检查", value: 3 },
            { source: "腹部检查", target: "B型（辉度调制）", value: 2 }, // 腹部用B型
            { source: "心血管检查", target: "M型（时间-运动）", value: 2 }, // 心血管用M型+Doppler
            { source: "心血管检查", target: "Doppler型", value: 2 },
            { source: "妇产检查", target: "B型（辉度调制）", value: 2 }
        ],
        // 节点分类（用于配色和分组）
        categories: [
            { name: "核心原理", itemStyle: { color: "#3498db" } },
            { name: "设备结构", itemStyle: { color: "#2ecc71" } },
            { name: "成像模式", itemStyle: { color: "#f39c12" } },
            { name: "物理特性", itemStyle: { color: "#9b59b6" } },
            { name: "应用场景", itemStyle: { color: "#e74c3c" } }
        ]
    };

    // ECharts配置项
    const option = {
        title: {
            text: "超声成像原理与设备知识图谱",
            left: "center",
            textStyle: {
                fontSize: 18,
                color: "#2c3e50",
                fontWeight: "bold"
            }
        },
        tooltip: {
            trigger: "item",
            formatter: (params) => {
                // 显示节点名称和详细描述
                return `<div style="font-size:14px;">
                    <b>${params.name}</b><br>
                    <span style="color:#666;">${params.data.desc}</span>
                </div>`;
            },
            backgroundColor: "rgba(255,255,255,0.9)",
            borderColor: "#3498db",
            borderWidth: 1,
            padding: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        },
        legend: {
            data: graphData.categories.map(cat => cat.name),
            left: "left",
            top: "bottom",
            textStyle: {
                fontSize: 12,
                color: "#333"
            }
        },
        series: [
            {
                type: "graph",
                layout: "force", // 力导向布局（动态交互）
                data: graphData.nodes,
                links: graphData.links,
                categories: graphData.categories,
                roam: true, // 支持缩放和拖拽
                label: {
                    show: true,
                    fontSize: 12,
                    color: "#2c3e50",
                    fontWeight: "500",
                    formatter: (params) => {
                        // 节点名称换行（长名称适配）
                        const name = params.name;
                        if (name.length > 6) {
                            return name.substring(0, 6) + "\n" + name.substring(6);
                        }
                        return name;
                    }
                },
                lineStyle: {
                    color: "source", // 线条颜色跟随起点节点
                    curveness: 0.2, // 线条弯曲度
                    width: 2,
                    opacity: 0.6
                },
                emphasis: {
                    focus: "adjacency", // 高亮关联节点
                    lineStyle: {
                        width: 4,
                        opacity: 0.8
                    },
                    label: {
                        fontSize: 14,
                        color: "#3498db"
                    }
                },
                // 力导向布局参数（控制节点分布）
                force: {
                    repulsion: 300, // 节点间排斥力（避免重叠）
                    gravity: 0.05, // 向中心聚集的力
                    edgeLength: 120, // 边的长度
                    layoutAnimation: true // 布局动画
                }
            }
        ]
    };

    // 应用配置项
    myChart.setOption(option);

    // 响应式调整（窗口大小变化时重置图表）
    window.addEventListener('resize', () => {
        myChart.resize();
    });

    // 点击节点时高亮关联链路
    myChart.on('click', (params) => {
        if (params.dataType === 'node') {
            const links = graphData.links.filter(link => 
                link.source.name === params.name || link.target.name === params.name
            );
            // 更新选项，高亮关联链路
            myChart.setOption({
                series: [
                    {
                        links: graphData.links.map(link => {
                            const isRelated = links.some(rel => 
                                (rel.source.name === link.source.name && rel.target.name === link.target.name) ||
                                (rel.source.name === link.target.name && rel.target.name === link.source.name)
                            );
                            return {
                                ...link,
                                lineStyle: {
                                    ...link.lineStyle,
                                    width: isRelated ? 4 : 2,
                                    opacity: isRelated ? 0.9 : 0.6
                                }
                            };
                        })
                    }
                ]
            });
        }
    });
});