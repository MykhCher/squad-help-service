import styles from './HowItWorks.module.sass';


function HowItWorks() {
  return (
    <>
        <div className={styles.headerText}>
            <h1>HOW IT WORKS</h1>
        </div>
        <div className={styles.description}>
            <div>
                <p> <span>1.</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, commodi odio quia quasi incidunt perspiciatis aliquam aspernatur consequuntur veniam odit fugit alias eveniet asperiores explicabo fuga laudantium corrupti animi at molestias blanditiis repellendus vitae saepe aperiam quaerat? Excepturi repudiandae similique delectus, nulla aut soluta impedit reiciendis incidunt, voluptatibus iusto animi!</p>
            </div>
            <div>
                <p><span>2.</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, commodi odio quia quasi incidunt perspiciatis aliquam aspernatur consequuntur veniam odit fugit alias eveniet asperiores explicabo fuga laudantium corrupti animi at molestias blanditiis repellendus vitae saepe aperiam quaerat? Excepturi repudiandae similique delectus, nulla aut soluta impedit reiciendis incidunt, voluptatibus iusto animi!</p>
            </div>
            <div>
                <p><span>3.</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, commodi odio quia quasi incidunt perspiciatis aliquam aspernatur consequuntur veniam odit fugit alias eveniet asperiores explicabo fuga laudantium corrupti animi at molestias blanditiis repellendus vitae saepe aperiam quaerat? Excepturi repudiandae similique delectus, nulla aut soluta impedit reiciendis incidunt, voluptatibus iusto animi!</p>
            </div>
        </div>
        <div className={styles.step}>
            <div className={styles.stepText}>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore beatae voluptas expedita vero excepturi vitae reprehenderit ducimus voluptate? Beatae exercitationem eius, doloremque est quasi aut nihil suscipit natus sunt voluptatum incidunt quam magnam earum sed minus numquam vero iusto blanditiis.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora totam inventore expedita dolorem perspiciatis, aut facere cumque recusandae labore eveniet soluta ea esse, iure voluptates harum quasi. Dicta corporis sapiente expedita quos, odio ut tenetur, illo consequuntur alias ipsum natus.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero culpa autem fugit, nostrum atque qui nemo? Deleniti possimus blanditiis accusantium similique voluptatem ullam aspernatur temporibus facere! Optio voluptates quibusdam officia!</p>
            </div>
            <div className={styles.stepImg}>
                <p>image</p>
            </div>
        </div>
        <div className={styles.afterStep}>
            <h2>What's Next?</h2>
            <div className={styles.description}>
                <div>
                    <p> <span>1.</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique iste ipsum molestias nostrum? Magni sunt ducimus maiores iste praesentium quidem, laborum culpa quaerat assumenda ullam id ipsam corrupti expedita qui harum, deleniti consequuntur voluptatum fugiat. Suscipit aperiam earum sapiente voluptatibus! Unde, doloremque aliquid! Ullam quidem enim laudantium saepe quas, odit accusamus? Perferendis repudiandae assumenda laudantium expedita, eos ea odio, eligendi maxime, veniam quaerat nesciunt officiis! Harum commodi hic impedit quidem.</p>
                </div>
                <div>
                    <p> <span>2.</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique iste ipsum molestias nostrum? Magni sunt ducimus maiores iste praesentium quidem, laborum culpa quaerat assumenda ullam id ipsam corrupti expedita qui harum, deleniti consequuntur voluptatum fugiat. Suscipit aperiam earum sapiente voluptatibus! Unde, doloremque aliquid! Ullam quidem enim laudantium saepe quas, odit accusamus? Perferendis repudiandae assumenda laudantium expedita, eos ea odio, eligendi maxime, veniam quaerat nesciunt officiis! Harum commodi hic impedit quidem.</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default HowItWorks;