
'use client'

import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/navbar.module.scss"
import Link from "next/link";
import Image from "next/image";
import Dialog from "../Dialog";
import CartModal from "../Cart/CartModal";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { createClient } from "../../../utils/supabase/client";
import { setCurrentUser } from "@/Store/slices/AuthSlice";
import { getCartItems } from "@/Store/Actions/GetCartItems";
import { selectCartItems } from "@/Store/selectors/cartSelectors";
import { AddToCartModal } from "../Cart/AddToCartModal";
import { getProfile } from "@/Store/Actions/GetProfile";

const Navbar = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [user, setUser] = useState<any>({})
    const [cartModal, setCartModal] = useState<boolean>(false);

    // const currentUser = useAppSelector(selectCurrentUser);
    const cartItems = useAppSelector(selectCartItems);
    const totalItems = cartItems?.reduce(
        (acc, item) => acc + Number(item.quantity),
        0
    );
    const dispatch = useAppDispatch()

    useEffect(() => {
        const currentUser = async () => {
            const supabase = createClient()
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (user) {
                setUser(user)
                dispatch(setCurrentUser(user))
                dispatch(getProfile(user.id))
                dispatch(getCartItems(user.id))
            }
        }

        currentUser()
    }, [])


    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClient()
    const signIn = async (formData: FormData) => {


        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const supabase = createClient()

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        router.refresh()
        if (error) {
            return redirect('/login?message=Could not authenticate user')
        }
    }

    const signUp = async (formData: FormData) => {
        // 'use server'

        // const origin = headers().get('origin')
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const supabase = createClient()

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `localhost:3000/auth/callback`,
            },
        })

        if (error) {
            return redirect('/login?message=Could not authenticate user')
        }

        router.refresh()
        // return redirect('/login?message=Check email to continue sign in process')
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }



    return (
        <>
            <div className={styles.container}>
                <div className={styles.navContainer}>
                    {/* {currentUser?.userType === UserType.Admin && ( */}
                    <Link href="/admin" className={styles.link} prefetch={false}>
                        Admin
                    </Link>
                    {/* )} */}
                    <Link href="/" className={styles.link} prefetch={false}>
                        Acasă
                    </Link>
                    {/*  <Link href="/" className="{`${link} ${router.pathname === "/" ?"active_link : ''}`}" prefetch={false}>
                    Acasă
                </Link> */}
                    <Link href="/miere" className={styles.link} prefetch={false}>
                        Miere
                    </Link>
                    {/* <Image src={Logo} alt="Henig Honig" className={styles.logo} /> */}
                    <Link href="/about" className={styles.link} prefetch={false}>
                        Despre noi
                    </Link>
                    {/* <Link href="/retete/" data-active={pathname === '/retete'} className={styles.link} prefetch={false}>
                    Rețete
                </Link>
                <Link href="/articole/" data-active={pathname === '/articole'} className={styles.link} prefetch={false}>
                    Articole
                </Link> */}
                    <Link href="/contact" className={styles.link} prefetch={false}>
                        Contact
                    </Link>
                    {/*           <div
                        aria-owns={cartModal ? "mouse-over-popover" : undefined}
                        onMouseEnter={(e) => {
                            setCartModal(true);
                        }}
                        onMouseLeave={() => setCartModal(false)}
                    /*    sx={{
                           position: "relative",
                           cursor: "pointer",
                       }} */
                    // >
                   /*  /*     <Link  href="/cart" data-active={pathname === '/cart'} className={styles.cartLink} prefetch={false}>
                            <ShoppingCartIcon />
                    {/* {cartItems.length > 0 && (
                                <span className="cartNumber">{totalItems}</span>
                            )} */}
                    {/* </Link> */}

                    {/* {cartModal && <>{cartModalComponent()}</>} */}

                    <Link href="/cart" data-active={pathname === '/cart'} className={styles.cartLink} prefetch={false} onMouseEnter={(e) => {
                        setCartModal(true)
                    }}
                        onMouseLeave={() => setCartModal(false)}
                        style={{ position: 'relative', cursor: 'pointer' }}
                    >
                        <svg width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="rgba(248, 201, 125, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {cartItems.length > 0 && (
                            <span className={styles.cartNumber}>{totalItems}</span>
                        )}
                        {cartModal && (
                            <div className={styles.cartModal}>
                                <CartModal setOpenDialog={setOpenDialog} />
                            </div>
                        )}
                    </Link>



                    {
                        user.email ? (
                            <div
                                onMouseEnter={() => setIsLogin(true)}
                                onMouseLeave={() => setIsLogin(false)}
                                style={{ position: 'relative' }}
                                className={styles.login}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="rgba(248, 201, 125, 1)" width="25px" height="25px" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" /></svg>
                                {user.email}
                                {
                                    (user.email && isLogin) && (
                                        <div className={styles.loginDialog}>
                                            <Link href='/orders'>Comenzile mele</Link>
                                            <Link href='/cart'>Coșul meu</Link>
                                            <button onClick={() => handleSignOut()}>Logout</button>
                                        </div>
                                    )
                                }

                            </div>
                        ) : (
                            <div
                                style={{ position: 'relative' }}
                                className={styles.login}
                                onMouseEnter={() => setIsLogin(true)}
                                onMouseLeave={() => setIsLogin(false)}
                            >
                                <p>Log in</p>
                                {
                                    isLogin && (
                                        <div className={styles.loginDialog}>
                                            <p>Nu sunteți logat!</p>
                                            <button onClick={() => setOpenDialog(true)}>Log in</button>
                                        </div>
                                    )
                                }

                            </div>
                        )
                    }
                </div>
                {
                    openDialog && (
                        <Dialog closeDialog={setOpenDialog}>
                            <div className={styles.dialogHeader}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                    <path fill="rgba(248, 201, 125, 1)" fill-opacity="1" d="M0,96L40,90.7C80,85,160,75,240,80C320,85,400,107,480,117.3C560,128,640,128,720,112C800,96,880,64,960,69.3C1040,75,1120,117,1200,117.3C1280,117,1360,75,1400,53.3L1440,32L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
                                </svg>
                                <div className={styles.title}>
                                    <h1>Intră în cont</h1>
                                    <span onClick={() => setOpenDialog(false)} className={styles.close}>X</span>

                                </div>

                                <form
                                    className={styles.form}
                                    action={signIn}
                                >
                                    <div className={styles.inputContainer}>
                                        <label className={styles.label} htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            name="email"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <label className="text-md" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            required
                                        />
                                    </div>
                                    <button className={styles.loginBTN}>
                                        Intră în cont
                                    </button>
                                    <button
                                        className={styles.signupBTN}
                                        formAction={signUp}

                                    >
                                        Creeaza cont
                                    </button>
                                </form>
                            </div>
                        </Dialog>
                    )
                }
            </div >
            {/* <HamburgerMenu /> */}
        </>
    )
}

export default Navbar