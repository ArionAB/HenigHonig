import React from 'react'
import styles from '@/styles/hero.module.scss'

const Hero = () => {
    return (
        <div className={styles.heroContainer}>
            <div className={styles.container}>
                <video src='/hero_video.mp4'
                    loop
                    autoPlay
                    muted
                >

                </video>
            </div>
            <div className={styles.secondContainer}>
                <div className={styles.hero_wrapper}>
                    <h1 className={styles.hero}>
                        PURE <span>•</span> RAW <span>•</span> DELICIOUS
                    </h1>
                    <p className={styles.discover}>
                        Descoperă mierea naturală din Transilvania.
                    </p>
                </div>
                <a href="/miere">
                    <button className={styles.products_btn}>Produse</button>
                </a>
            </div>
        </div>
    )
}

export default Hero