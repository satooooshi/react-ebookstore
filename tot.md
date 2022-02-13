function vs. component translation

https://www.asobou.co.jp/blog/web/css-selectors#3class
HTMLタグを指定
<p>pタグの内容</p>
p {
    color: #F80206;
}
*（すべての要素を指定）
.class（クラス名の指定）
#id（ID名の指定）

.MuiGrid-item
 <Grid
----------------------

import useStyles from './styles';
...
const classes = useStyles();
...
 <AppBar position="fixed" className={classes.appBar} color="inherit">

export default makeStyles((theme) => ({
  appBar: {
    color:'white',
    boxShadow: 'none',

-----------------------


const useStyles = makeStyles(
    https://qiita.com/gumiTECH/items/9e0f3172b8f85e93cbbe



.MuiContainer-root.product-view {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 150px 0 100px 0;
  }
  
  .product-view .image-wrapper img {
    width: 100%;
  }
  .product-view .text h2 {
    color: #000;
    font-size: 30px;
  }

import './style.css'
<Container className="product-view">
...
    return (
        <Container className="product-view">
          <Grid container>
            <Grid item xs={12} md={6} className="image-wrapper">
              <img src={product.src} alt={product.name}
              />
            </Grid>
            <Grid item xs={12} md={5} className="text">
    

https://codezine.jp/article/detail/14322?p=2
https://codezine.jp/article/detail/14615
Layout: レイアウトのためのコンポーネント
Inputs: 入力のためのコンポーネント
Navigation: ナビゲーションに関するコンポーネント
Surfaces: 任意のコンポーネントを載せるためのコンポーネント（★）
Feedback: フィードバックのためのコンポーネント（★）
Data Display: データ表示のためのコンポーネント（★）
Utils: 各種の便利なコンポーネント（★）

layoutコンポーネント	概要
Box	コンポーネントを囲んだ領域を作る Boxをはじめとしたレイアウトに関するコンポーネントでは、親コンポーネントの幅に対して割合に応じた幅を持つことができます。
https://www.wakuwakubank.com/posts/763-react-material-ui/
Container	大きな画面の中で中央寄せのコンテンツ表示領域を作る
<Container>
        <Box style={{ display: 'flex', flexDirection: 'row' }}>{/* (1) */}
          <Box width={1/4} style={{ padding: '8px' }} border={1}>{/* (2) */}
            <Button
              variant="contained"
              color="secondary"
              style={{ width: '100%' }}
            >
              ボタン1
            </Button>
          </Box> 
Grid	グリッド状にレイアウトする Column widths are integer values between 1 and 12; five grid breakpoints: xs, sm, md, lg, and xl; 
  <Grid item xs={6} md={8}>
    <Item>xs=6 md=8</Item>
  </Grid>

Grid List	グリッド状のスクロール領域を作る
Hidden	画面サイズに応じて表示・非表示を切り替える

全体的にprimaryの色合いで統一感を出しつつ、アクセントとしてsecondaryの色を使う
        <Button variant="contained" color="secondary">{/* (6) */}
          Hello World
        </Button>



任意のコンポーネントを載せるためのコンポーネント
もしMaterial-UIに用意されていないコンポーネントを自作したくなった場合には、Paperを使ってみるといいかもしれません。
コンポーネント	概要
App Bar	ヘッダーを表示する。
Paper	浮かび具合を調整できる「紙」を表示する。
<Paper elevation={0}>elevation: 0</Paper>
<Paper>elevation: default</Paper> /// elevation={1}
<Paper elevation={3}>elevation: 3</Paper>
Card	カスタマイズ可能なカードを表示する。
Accordion	開閉するUIを表示する。

フィードバックのためのコンポーネント
コンポーネント	概要
Progress	回転やゲージの形で読み込み中のUIを表示する。
{/* 回転する */}
<CircularProgress />
{/* 横棒がアニメーションする */}
<LinearProgress />
{/* 進捗を指定できる */}
<LinearProgress variant="determinate" value={60} />{/* (1) */} //variant="determinate"属性を指定することで、進捗を直接指定できます。
Dialog	ダイアログを表示する。
Snackbar	下からポップアップするメッセージを表示する。送信処理の完了時などにしたからポップアップしてくるUIです。
Backdrop	画面全体を暗くした領域を提供する。


データ表示のためのコンポーネント
コンポーネント	概要
Avatar 	顔写真やアイコンを表示する。
<Avatar />{/* デフォルト */}
<Avatar src="/nkzn.png" />{/* 画像パスを指定 */}
<Avatar>YN</Avatar>{/* テキストを指定 */}
Badge	
任意のビューの右上にバッジを表示する。
Chip	チップを表示する。
Divider	区切り線を表示する。
Icons	
Material Designの公式アイコンを表示する。
List	リストを表示する。
Table	表を表示する。
Tooltip	マウスオーバーしたときに吹き出しを表示する。
Typography	
テキストを表示する。
<Tooltip title="新着メッセージが4件あります" arrow>{/* (1) */}
  <Badge badgeContent={'4'} color='primary'>
    <Avatar src="/nkzn.png" />
  </Badge>
</Tooltip>



https://nansystem.com/shallow-copy-vs-deep-copy/
array slice for deep copy
json const copiedObj = JSON.parse(JSON.stringify(obj)); for deep copy

Spread Attributes
https://yami-beta.hateblo.jp/entry/2016/09/06/112330
React での「...」（ドット3つ）の記法
        <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
append to array

https://tyotto-good.com/blog/usestate-pitfalls
React Hooks】useStateの注意点と解決策3選
that's why use const !!

value={varName}
React のレンダーのライフサイクルでは、フォーム要素の value 属性は DOM の値を上書きします。


【React】import や constで{} を使う時使わない時の違い
const { fuga } = fugafugafuga//④
分割代入といい fugafugafuga= {a:1, b:1, c:1}のような場合、const { a }=fugafugafugaによりオブジェクトの一部を取り出し定数化することができる。

https://codesandbox.io/s/react-hook-form-v7-controller-5h1q5?file=/src/index.js
https://react-hook-form.com/jp/get-started/
npm install react-hook-form
React Hook Form によるシンプルなフォームバリデーション。Controller
https://zenn.dev/someone7140/articles/e08529b5394e34
Controllerはreact-hook-formのドキュメントにある通り、react-hook-formと外部のライブラリを組み合わせるためのラッパーコンポーネントです。

便利なHookFormだが,Material-UIなどのツールと共存すると正常に動作しないので困る.
ここをよくわかっていないと,「Material-UIと共存できないとかwww 使う意味なくね？wwww」と言われる.
制御ができない場合はControllerコンポーネントを使って制御する
制御ができない場合とはref属性を設定することができないもののようです



checkoutToken cart etc info
Checkout.jsx
  // カート情報得る
  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          //const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

PaymentForm
  const handleSubmit
      // カード情報得る
      const cardElement = elements.getElement(CardElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
      // commercejsにorderData送ってオーダーをコンファーム
      const orderData = {
        line_items: checkoutToken.live.line_items,
      ...other details are options...
       // Once Stripe returns with the payment method, 
      // you need to tell Commerce.js to capture the order, 
      // and provide the Stripe payment method ID that Chec should charge
         payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
      // commercejsに送ってオーダーをコンファーム
      onCaptureCheckout(checkoutToken.id, orderData);

App.js
      const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
       try {
          const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);


json key study
product
cart and needed calcuration
order


find undefined
findIndex -1
foreach