// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gradientBackground = document.querySelector('.gradient-background');
    const navLinks = document.querySelectorAll('.navbar a');

    let hue1 = 220; // 初始色相1 (蓝色)
    let hue2 = 270; // 初始色相2 (紫色)
    const saturation = 50; // 降低饱和度
    const lightness = 80;  // 提高亮度
    
    let animationId; // 用于存储动画帧ID

    // 1. 基础色彩流动动画
    function animateBackground() {
        // 让色相值缓慢增加，到达360后重置为0，形成循环
        hue1 = (hue1 + 0.25) % 360;
        hue2 = (hue2 + 0.35) % 360; //  slightly different speed for more dynamism
        
        // 将 HSL 颜色转换为 CSS 能用的字符串
        const color1 = `hsl(${hue1}, ${saturation}%, ${lightness}%)`;
        const color2 = `hsl(${hue2}, ${saturation}%, ${lightness}%)`;
        
        // 应用新的渐变背景
        gradientBackground.style.background = `linear-gradient(${currentAngle}deg, ${color1}, ${color2})`;
        
        // 请求下一帧动画
        animationId = requestAnimationFrame(animateBackground);
    }

    // 2. 鼠标移动互动 - 控制渐变角度
    let currentAngle = 90; // 初始角度
    document.addEventListener('mousemove', (e) => {
        // 根据鼠标在窗口中的X坐标，计算渐变角度 (0deg 到 180deg)
        // e.clientX 是鼠标的X坐标，window.innerWidth 是窗口宽度
        currentAngle = (e.clientX / window.innerWidth) * 180;
    });

    // 3. 导航链接悬停特效
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // 暂停基础动画
            cancelAnimationFrame(animationId);
            
            // 获取链接的颜色（假设在CSS中定义了）
            const linkColor = window.getComputedStyle(link).color;
            
            // 这里可以做更复杂的颜色提取，为了简化，我们直接设置一个目标色相
            // 例如，让背景色向粉色系靠近
            hue1 = 210; 
            hue2 = 230;
            
            const color1 = `hsl(${hue1}, ${saturation}%, ${lightness}%)`;
            const color2 = `hsl(${hue2}, ${saturation}%, ${lightness}%)`;
            
            gradientBackground.style.background = `linear-gradient(${currentAngle}deg, ${color1}, ${color2})`;
        });

        link.addEventListener('mouseleave', () => {
            // 鼠标离开时，恢复基础动画
            animateBackground();
        });
    });
    
    // 启动动画
    animateBackground();
});