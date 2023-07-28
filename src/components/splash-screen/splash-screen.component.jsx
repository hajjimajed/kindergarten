import './splash-screen.styles.scss';
import { motion } from 'framer-motion';



const SplashScreen = () => {
    const bar1 = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            width: 0
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            width: 230
        }
    };

    const bar2 = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            width: 0
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            width: 255
        }
    };

    const bar3 = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            width: 0
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            width: 135
        }
    };

    const point = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            translateX: 30,
            translateY: -30,
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            translateX: 0,
            translateY: 0
        }
    };
    const text = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            translateY: 30,
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            translateY: 0
        }
    };

    return (
        <div className='splash-container'>
            <motion.svg className='logo' width="382" height="310" viewBox="0 0 491 491" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.rect
                    variants={bar1}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        default: { duration: 1, ease: "easeInOut" },
                        fill: { duration: 1, ease: [1, 0, 0.8, 1] }
                    }}
                    x="93.613" y="177.066" width="231.926" height="92.024" rx="46.012" transform="rotate(-45 93.613 177.066)" fill="#826AED" />
                <motion.rect
                    variants={bar2}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        default: { duration: 1, ease: "easeInOut" },
                        fill: { duration: 1, ease: [1, 0, 0.8, 1] }
                    }}
                    x="168.835" y="257.027" width="253.761" height="92.024" rx="46.012" transform="rotate(-45 168.835 257.027)" fill="#826AED" />
                <motion.rect
                    variants={bar3}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        default: { duration: 1, ease: "easeInOut" },
                        fill: { duration: 1, ease: [1, 0, 0.8, 1] }
                    }}
                    x="241.613" y="338.676" width="138.036" height="92.024" rx="46.012" transform="rotate(-45 241.613 338.676)" fill="#826AED" />
                <motion.path
                    variants={point}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        default: { duration: 0.5, ease: "easeInOut", delay: 1 },
                        fill: { duration: 0.5, ease: [1, 0, 0.8, 1], delay: 1 }
                    }}
                    d="M123.395 384.313C117.935 384.269 113.52 379.854 113.476 374.394L112.843 295.477C112.771 286.529 123.587 281.999 129.914 288.326L209.463 367.875C215.79 374.202 211.26 385.018 202.312 384.946L123.395 384.313Z" fill="black" />
            </motion.svg>
            <motion.h1
                variants={text}
                initial="hidden"
                animate="visible"
                transition={{
                    default: { duration: 0.3, ease: "easeInOut", delay: 2 },
                    fill: { duration: 0.3, ease: [1, 0, 0.8, 1], delay: 2 }
                }}
            >حقيبة المنشط لرياض الاطفال</motion.h1>
            <motion.h1
                variants={text}
                initial="hidden"
                animate="visible"
                transition={{
                    default: { duration: 0.3, ease: "easeInOut", delay: 2 },
                    fill: { duration: 0.3, ease: [1, 0, 0.8, 1], delay: 2 }
                }}
            >Pack Animateur Jardin d'Enfant</motion.h1>
        </div>
    )

}

export default SplashScreen;