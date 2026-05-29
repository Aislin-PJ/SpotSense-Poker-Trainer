// ============================================================
// CONSTANTS
// ============================================================
const POSITIONS = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'];
const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const CHART_RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const LS_KEY = 'pokerTrainer_v1';
const STORAGE_VERSION = 3;
const QUICK_DIAGNOSTIC_HANDS = 20;
const TRAINING_SESSION_HANDS = 10;
const MISTAKE_REPLAY_LIMIT = 50;
const DAILY_HAND_GOAL = 20;
const AD_SESSION_THRESHOLD = 50;
const AD_HAND_THRESHOLD = 500;
const AD_DAILY_LIMIT = 3;
const DONATE_URL = 'https://ko-fi.com/preflop777';
const SUPPORT_FEEDBACK_ENDPOINT = 'https://formspree.io/f/xlgvazpe';
// Google Publisher Tag web interstitial is the only built-in third-party ad path.
// Source: https://developers.google.com/publisher-tag/samples/display-web-interstitial-ad
const GOOGLE_PUBLISHER_TAG_URL = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
const AD_SERVICE_DEFAULTS = Object.freeze({
    provider: 'google-publisher-tag',
    enabled: false,
    gptAdUnitPath: '',
    enableHouseAdFallback: false
});
const POKER_GLOSSARY_CATEGORY_LABELS = Object.freeze({
    flow: {
        en: 'Flow & positions',
        'zh-TW': '牌局流程與位置',
        ja: '進行とポジション',
        ko: '진행과 포지션',
        es: 'Flujo y posiciones'
    },
    actions: {
        en: 'Actions & betting lines',
        'zh-TW': '行動與下注路線',
        ja: 'アクションとベットライン',
        ko: '액션과 베팅 라인',
        es: 'Acciones y lineas de apuesta'
    },
    strength: {
        en: 'Hand strength & boards',
        'zh-TW': '牌力與牌面',
        ja: 'ハンドの強さとボード',
        ko: '핸드 강도와 보드',
        es: 'Fuerza de mano y boards'
    },
    range: {
        en: 'Range & strategy',
        'zh-TW': '範圍與策略',
        ja: 'レンジと戦略',
        ko: '레인지와 전략',
        es: 'Rango y estrategia'
    },
    math: {
        en: 'Odds, stacks & stats',
        'zh-TW': '賠率、籌碼與數據',
        ja: 'オッズ、スタック、統計',
        ko: '오즈, 스택, 통계',
        es: 'Odds, stacks y estadisticas'
    },
    tournament: {
        en: 'Tournament & table terms',
        'zh-TW': '錦標賽與牌桌用語',
        ja: 'トーナメントとテーブル用語',
        ko: '토너먼트와 테이블 용어',
        es: 'Torneos y mesa'
    }
});
const POKER_GLOSSARY = Object.freeze([
    { category: 'flow', en: 'Small Blind (SB)', local: { 'zh-TW': '小盲位', ja: 'スモールブラインド', ko: '스몰 블라인드', es: 'Ciega pequena' }, desc: { en: 'The player posting the smaller forced blind before cards are dealt.', 'zh-TW': '發牌前先放入較小強制盲注的位置。' } },
    { category: 'flow', en: 'Big Blind (BB)', local: { 'zh-TW': '大盲位', ja: 'ビッグブラインド', ko: '빅 블라인드', es: 'Ciega grande' }, desc: { en: 'The player posting the full blind; the blind size is the usual bb unit.', 'zh-TW': '放入完整盲注的位置，也是常用的 bb 籌碼單位來源。' } },
    { category: 'flow', en: 'Under the Gun (UTG)', local: { 'zh-TW': '槍口位', ja: 'アンダーザガン', ko: '언더 더 건', es: 'Under the Gun' }, desc: { en: 'The first preflop player to act, so the opening range should be tight.', 'zh-TW': '翻牌前第一個行動的位置，後面還有很多人未行動，因此開局範圍要緊。' } },
    { category: 'flow', en: 'Hijack (HJ)', local: { 'zh-TW': '劫持位', ja: 'ハイジャック', ko: '하이잭', es: 'Hijack' }, desc: { en: 'Middle-late position that can open wider than UTG but still faces CO, BTN, and blinds.', 'zh-TW': '中後段位置，可比 UTG 開得寬，但仍要面對 CO、BTN 與盲位。' } },
    { category: 'flow', en: 'Cutoff (CO)', local: { 'zh-TW': '關門位', ja: 'カットオフ', ko: '컷오프', es: 'Cutoff' }, desc: { en: 'The seat before BTN; a strong stealing position.', 'zh-TW': 'BTN 前一位，是常見偷盲與施壓位置。' } },
    { category: 'flow', en: 'Button (BTN)', local: { 'zh-TW': '按鈕位', ja: 'ボタン', ko: '버튼', es: 'Boton' }, desc: { en: 'The dealer button. Acts last postflop and has the best positional information.', 'zh-TW': '莊家按鈕位置，翻後最後行動，資訊優勢最大。' } },
    { category: 'flow', en: 'In Position (IP)', local: { 'zh-TW': '有位置', ja: 'インポジション', ko: '인 포지션', es: 'En posicion' }, desc: { en: 'Acting after the opponent postflop.', 'zh-TW': '翻後比對手晚行動，可以先看對手決策。' } },
    { category: 'flow', en: 'Out of Position (OOP)', local: { 'zh-TW': '無位置', ja: 'アウトオブポジション', ko: '아웃 오브 포지션', es: 'Fuera de posicion' }, desc: { en: 'Acting before the opponent postflop.', 'zh-TW': '翻後比對手早行動，資訊劣勢較大。' } },
    { category: 'flow', en: 'Blinds', local: { 'zh-TW': '盲注', ja: 'ブラインド', ko: '블라인드', es: 'Ciegas' }, desc: { en: 'Forced bets posted before cards are dealt.', 'zh-TW': '發牌前強制放入底池的籌碼。' } },
    { category: 'flow', en: 'Ante', local: { 'zh-TW': '底注', ja: 'アンティ', ko: '앤티', es: 'Ante' }, desc: { en: 'A small forced contribution, usually in tournaments, paid in addition to blinds.', 'zh-TW': '盲注之外的小額強制投入，多見於錦標賽。' } },
    { category: 'flow', en: 'Hole Cards', local: { 'zh-TW': '底牌', ja: 'ホールカード', ko: '홀 카드', es: 'Cartas privadas' }, desc: { en: 'The two private cards only you can see.', 'zh-TW': '只有你自己看得到的兩張手牌。' } },
    { category: 'flow', en: 'Preflop', local: { 'zh-TW': '翻牌前', ja: 'プリフロップ', ko: '프리플랍', es: 'Preflop' }, desc: { en: 'The betting round before community cards appear.', 'zh-TW': '公共牌尚未出現前的下注回合。' } },
    { category: 'flow', en: 'Flop', local: { 'zh-TW': '翻牌', ja: 'フロップ', ko: '플랍', es: 'Flop' }, desc: { en: 'The first three community cards.', 'zh-TW': '第一次發出的三張公共牌。' } },
    { category: 'flow', en: 'Turn', local: { 'zh-TW': '轉牌', ja: 'ターン', ko: '턴', es: 'Turn' }, desc: { en: 'The fourth community card.', 'zh-TW': '第四張公共牌。' } },
    { category: 'flow', en: 'River', local: { 'zh-TW': '河牌', ja: 'リバー', ko: '리버', es: 'River' }, desc: { en: 'The fifth and final community card.', 'zh-TW': '第五張也是最後一張公共牌。' } },
    { category: 'flow', en: 'Showdown', local: { 'zh-TW': '攤牌', ja: 'ショーダウン', ko: '쇼다운', es: 'Showdown' }, desc: { en: 'The point where remaining players reveal cards to decide the winner.', 'zh-TW': '仍在牌局中的玩家亮牌比較牌力。' } },
    { category: 'actions', en: 'Fold', local: { 'zh-TW': '棄牌', ja: 'フォールド', ko: '폴드', es: 'Foldear' }, desc: { en: 'Give up the hand and stop contesting the pot.', 'zh-TW': '放棄這手牌，不再爭奪底池。' } },
    { category: 'actions', en: 'Check', local: { 'zh-TW': '過牌', ja: 'チェック', ko: '체크', es: 'Pasar' }, desc: { en: 'Take no betting action when no bet is facing you.', 'zh-TW': '前面沒有人下注時，不投入籌碼並把行動交給下一位。' } },
    { category: 'actions', en: 'Bet', local: { 'zh-TW': '下注', ja: 'ベット', ko: '베팅', es: 'Apostar' }, desc: { en: 'Put chips into the pot first on a street.', 'zh-TW': '在該街率先投入籌碼。' } },
    { category: 'actions', en: 'Call', local: { 'zh-TW': '跟注', ja: 'コール', ko: '콜', es: 'Pagar' }, desc: { en: 'Match the current bet to continue.', 'zh-TW': '投入與目前下注相同的籌碼以繼續。' } },
    { category: 'actions', en: 'Raise', local: { 'zh-TW': '加注', ja: 'レイズ', ko: '레이즈', es: 'Subir' }, desc: { en: 'Increase the price after a bet has been made.', 'zh-TW': '面對下注時投入更多籌碼，提高對手繼續的價格。' } },
    { category: 'actions', en: 'Re-Raise', local: { 'zh-TW': '再加注', ja: 'リレイズ', ko: '리레이즈', es: 'Resubir' }, desc: { en: 'Raise after someone has already raised.', 'zh-TW': '面對加注後再次加注。' } },
    { category: 'actions', en: 'Open Raise', local: { 'zh-TW': '率先加注', ja: 'オープンレイズ', ko: '오픈 레이즈', es: 'Open raise' }, desc: { en: 'The first voluntary raise preflop.', 'zh-TW': '翻牌前第一個自願加注入池的行動。' } },
    { category: 'actions', en: 'Limp', local: { 'zh-TW': '跛入', ja: 'リンプ', ko: '림프', es: 'Limpear' }, desc: { en: 'Call the big blind preflop instead of raising.', 'zh-TW': '翻牌前只跟大盲，不選擇加注。' } },
    { category: 'actions', en: '3-Bet', local: { 'zh-TW': '三下注', ja: '3ベット', ko: '3벳', es: '3-bet' }, desc: { en: 'A re-raise after an open raise; it does not mean three times the size.', 'zh-TW': '面對 open raise 的再加注，不是加到三倍。' } },
    { category: 'actions', en: '4-Bet', local: { 'zh-TW': '四下注', ja: '4ベット', ko: '4벳', es: '4-bet' }, desc: { en: 'A raise after a 3-bet.', 'zh-TW': '面對 3-Bet 後再次加注。' } },
    { category: 'actions', en: 'All-in', local: { 'zh-TW': '全下', ja: 'オールイン', ko: '올인', es: 'All-in' }, desc: { en: 'Commit all remaining chips.', 'zh-TW': '投入所有剩餘籌碼。' } },
    { category: 'actions', en: 'Jam', local: { 'zh-TW': '推全下', ja: 'ジャム', ko: '잼', es: 'Jam' }, desc: { en: 'A common strategy term for moving all-in aggressively.', 'zh-TW': '策略語境中常指主動推入全下。' } },
    { category: 'actions', en: 'C-Bet', local: { 'zh-TW': '持續下注', ja: 'Cベット', ko: 'C-bet', es: 'C-bet' }, desc: { en: 'A continuation bet by the previous street aggressor, usually the preflop raiser on the flop.', 'zh-TW': '前一街進攻者在下一街延續下注，最常見是翻前加注者翻牌下注。' } },
    { category: 'actions', en: 'Barrel', local: { 'zh-TW': '連續下注', ja: 'バレル', ko: '배럴', es: 'Barrel' }, desc: { en: 'Continue betting across later streets.', 'zh-TW': '在轉牌或河牌繼續開火下注。' } },
    { category: 'actions', en: 'Check-Raise', local: { 'zh-TW': '過牌加注', ja: 'チェックレイズ', ko: '체크 레이즈', es: 'Check-raise' }, desc: { en: 'Check first, then raise after the opponent bets.', 'zh-TW': '先過牌，等對手下注後再加注。' } },
    { category: 'actions', en: 'Donk Bet', local: { 'zh-TW': '領先下注', ja: 'ドンクベット', ko: '동크벳', es: 'Donk bet' }, desc: { en: 'A bet into the previous street aggressor.', 'zh-TW': '前一街非進攻者，下一街反而率先下注。' } },
    { category: 'actions', en: 'Probe Bet', local: { 'zh-TW': '探測下注', ja: 'プローブベット', ko: '프로브 베트', es: 'Probe bet' }, desc: { en: 'A bet after the prior aggressor declines to c-bet.', 'zh-TW': '前一街進攻者選擇過牌後，防守方主動下注。' } },
    { category: 'actions', en: 'Stab', local: { 'zh-TW': '刺探下注', ja: 'スタブ', ko: '스탭', es: 'Stab' }, desc: { en: 'A bet in a pot where nobody has clearly taken the betting lead on that street.', 'zh-TW': '對手放棄下注或局面空出來時，嘗試主動下注拿下底池。' } },
    { category: 'actions', en: 'Float', local: { 'zh-TW': '浮跟', ja: 'フロート', ko: '플로트', es: 'Float' }, desc: { en: 'Call with the intention of taking the pot on a later street.', 'zh-TW': '用不一定很強的牌跟注，計畫在後續街用下注或加注拿下底池。' } },
    { category: 'actions', en: 'Overbet', local: { 'zh-TW': '超池下注', ja: 'オーバーベット', ko: '오버벳', es: 'Overbet' }, desc: { en: 'Bet more than the current pot size.', 'zh-TW': '下注金額大於目前底池。' } },
    { category: 'strength', en: 'Nuts', local: { 'zh-TW': '最強牌（堅果）', ja: 'ナッツ', ko: '넛', es: 'Nuts' }, desc: { en: 'The best possible hand on the current board. This trainer prefers “best possible hand” in explanatory copy.', 'zh-TW': '當下牌面沒有任何牌能擊敗的最佳牌型。本訓練器策略文案優先稱為「最強牌」。' } },
    { category: 'strength', en: 'Second Nuts', local: { 'zh-TW': '第二強牌', ja: 'セカンドナッツ', ko: '세컨드 넛', es: 'Second nuts' }, desc: { en: 'The second-best possible hand on the current board.', 'zh-TW': '當下牌面第二強的可能牌型。' } },
    { category: 'strength', en: 'Draw', local: { 'zh-TW': '聽牌', ja: 'ドロー', ko: '드로우', es: 'Proyecto' }, desc: { en: 'A hand that is not complete yet but can improve with future cards.', 'zh-TW': '目前尚未成牌，但後續公共牌可能讓它變強。' } },
    { category: 'strength', en: 'Flush Draw', local: { 'zh-TW': '同花聽牌', ja: 'フラッシュドロー', ko: '플러시 드로우', es: 'Proyecto de color' }, desc: { en: 'A draw needing another card of the same suit to make a flush.', 'zh-TW': '再來一張同花色牌就可能成同花。' } },
    { category: 'strength', en: 'Straight Draw', local: { 'zh-TW': '順子聽牌', ja: 'ストレートドロー', ko: '스트레이트 드로우', es: 'Proyecto de escalera' }, desc: { en: 'A draw needing a connecting rank to make a straight.', 'zh-TW': '再來特定點數就可能成順子。' } },
    { category: 'strength', en: 'Set', local: { 'zh-TW': '口袋三條', ja: 'セット', ko: '셋', es: 'Set' }, desc: { en: 'Three of a kind made with a pocket pair and one matching board card.', 'zh-TW': '手上一對加上牌面同點數牌形成的三條。' } },
    { category: 'strength', en: 'Trips', local: { 'zh-TW': '明三條', ja: 'トリップス', ko: '트립스', es: 'Trips' }, desc: { en: 'Three of a kind made when the board is paired and one hole card matches.', 'zh-TW': '牌面成對，再用一張手牌補成的三條。' } },
    { category: 'strength', en: 'Top Pair', local: { 'zh-TW': '頂對', ja: 'トップペア', ko: '탑 페어', es: 'Top pair' }, desc: { en: 'A pair using the highest-ranked board card.', 'zh-TW': '用手牌配上牌面最高張形成的一對。' } },
    { category: 'strength', en: 'Top Set', local: { 'zh-TW': '頂 Set', ja: 'トップセット', ko: '탑 셋', es: 'Top set' }, desc: { en: 'A set made with the highest-ranked board card.', 'zh-TW': '用手中口袋對子配上牌面最高點數形成的 Set。' } },
    { category: 'strength', en: 'Kicker', local: { 'zh-TW': '踢腳牌', ja: 'キッカー', ko: '키커', es: 'Kicker' }, desc: { en: 'The side card that breaks ties between similar made hands.', 'zh-TW': '牌型相同時用來比較大小的副牌。' } },
    { category: 'strength', en: 'Rainbow Board', local: { 'zh-TW': '彩虹牌面', ja: 'レインボーボード', ko: '레인보우 보드', es: 'Board rainbow' }, desc: { en: 'A board with three different suits on the flop.', 'zh-TW': '翻牌三張為三種不同花色。' } },
    { category: 'strength', en: 'Monotone Board', local: { 'zh-TW': '單色牌面', ja: 'モノトーンボード', ko: '모노톤 보드', es: 'Board monotono' }, desc: { en: 'A board where all visible cards share one suit.', 'zh-TW': '目前公共牌都屬於同一花色。' } },
    { category: 'strength', en: 'Two-tone Board', local: { 'zh-TW': '雙色牌面', ja: 'ツートーンボード', ko: '투톤 보드', es: 'Board two-tone' }, desc: { en: 'A board with two cards of one suit, often creating flush-draw pressure.', 'zh-TW': '牌面有兩張同花色牌，常帶來同花聽牌壓力。' } },
    { category: 'strength', en: 'Dry Board', local: { 'zh-TW': '乾燥牌面', ja: 'ドライボード', ko: '드라이 보드', es: 'Board seco' }, desc: { en: 'A board with few obvious straight or flush draws.', 'zh-TW': '順子或同花聽牌較少、連結性低的牌面。' } },
    { category: 'strength', en: 'Wet Board', local: { 'zh-TW': '濕潤牌面', ja: 'ウェットボード', ko: '웨트 보드', es: 'Board humedo' }, desc: { en: 'A connected board with many draws and changing future cards.', 'zh-TW': '連結性高、聽牌多，後續牌容易改變牌力的牌面。' } },
    { category: 'strength', en: 'Paired Board', local: { 'zh-TW': '成對牌面', ja: 'ペアボード', ko: '페어 보드', es: 'Board pareado' }, desc: { en: 'A board containing two cards of the same rank.', 'zh-TW': '公共牌上已有兩張同點數牌。' } },
    { category: 'strength', en: 'Blocker', local: { 'zh-TW': '阻斷牌', ja: 'ブロッカー', ko: '블로커', es: 'Blocker' }, desc: { en: 'A card you hold that reduces the chance the opponent has a specific strong hand.', 'zh-TW': '你手上的牌會降低對手持有某些強牌或跟注牌的機率。' } },
    { category: 'strength', en: 'Backdoor Draw', local: { 'zh-TW': '後門聽牌', ja: 'バックドアドロー', ko: '백도어 드로우', es: 'Proyecto backdoor' }, desc: { en: 'A draw that needs helpful cards on both later streets.', 'zh-TW': '需要轉牌與河牌連續幫忙才完成的聽牌。' } },
    { category: 'range', en: 'Range', local: { 'zh-TW': '範圍', ja: 'レンジ', ko: '레인지', es: 'Rango' }, desc: { en: 'The set of hands a player can reasonably have.', 'zh-TW': '某位玩家在這個行動後合理可能持有的所有手牌集合。' } },
    { category: 'range', en: 'Value Bet', local: { 'zh-TW': '價值下注', ja: 'バリューベット', ko: '밸류벳', es: 'Apuesta por valor' }, desc: { en: 'Bet expecting worse hands to call.', 'zh-TW': '預期較差的牌會跟注，因此用好牌下注拿價值。' } },
    { category: 'range', en: 'Bluff', local: { 'zh-TW': '詐唬', ja: 'ブラフ', ko: '블러프', es: 'Farol' }, desc: { en: 'Bet or raise hoping better hands fold.', 'zh-TW': '用不夠好的牌下注或加注，希望更好的牌棄牌。' } },
    { category: 'range', en: 'Semi-Bluff', local: { 'zh-TW': '半詐唬', ja: 'セミブラフ', ko: '세미 블러프', es: 'Semi-farol' }, desc: { en: 'Bluff with a draw that can still improve if called.', 'zh-TW': '用聽牌詐唬；被跟注後仍有機會成牌。' } },
    { category: 'range', en: 'Air', local: { 'zh-TW': '空氣牌', ja: 'エア', ko: '에어', es: 'Aire' }, desc: { en: 'A hand with little or no showdown value.', 'zh-TW': '幾乎沒有攤牌價值的弱牌。' } },
    { category: 'range', en: 'Bluff Catcher', local: { 'zh-TW': '抓詐唬牌', ja: 'ブラフキャッチャー', ko: '블러프 캐처', es: 'Bluff catcher' }, desc: { en: 'A hand that mostly wins only when the opponent is bluffing.', 'zh-TW': '主要靠對手在詐唬時才會贏的中等牌。' } },
    { category: 'range', en: 'Polarized Range', local: { 'zh-TW': '兩極化範圍', ja: 'ポラライズレンジ', ko: '폴라라이즈드 레인지', es: 'Rango polarizado' }, desc: { en: 'A range built from strong value hands and bluffs, with few medium hands.', 'zh-TW': '由強價值牌與詐唬牌組成，中等牌較少的範圍。' } },
    { category: 'range', en: 'Merged Range', local: { 'zh-TW': '合併範圍', ja: 'マージレンジ', ko: '머지드 레인지', es: 'Rango merged' }, desc: { en: 'A betting or raising range with many strong and medium-strength hands.', 'zh-TW': '下注或加注範圍中包含強牌與不少中強牌。' } },
    { category: 'range', en: 'Capped Range', local: { 'zh-TW': '封頂範圍', ja: 'キャップされたレンジ', ko: '캡된 레인지', es: 'Rango capado' }, desc: { en: 'A range that is unlikely to contain the strongest hands.', 'zh-TW': '因先前行動限制，通常不太會有最強牌的範圍。' } },
    { category: 'range', en: 'Uncapped Range', local: { 'zh-TW': '未封頂範圍', ja: 'アンキャップレンジ', ko: '언캡드 레인지', es: 'Rango no capado' }, desc: { en: 'A range that can still contain the strongest hands.', 'zh-TW': '仍可能包含最強牌的範圍。' } },
    { category: 'range', en: 'Range Advantage', local: { 'zh-TW': '範圍優勢', ja: 'レンジ優位', ko: '레인지 어드밴티지', es: 'Ventaja de rango' }, desc: { en: 'One player has more overall equity or more good hands on this board.', 'zh-TW': '某一方在這個牌面上整體勝率或好牌比例較高。' } },
    { category: 'range', en: 'Nut Advantage', local: { 'zh-TW': '最強牌優勢', ja: 'ナッツ優位', ko: '넛 어드밴티지', es: 'Ventaja de nuts' }, desc: { en: 'One player has more combinations of the best possible hands.', 'zh-TW': '某一方在這個牌面上更常擁有最強牌組合。' } },
    { category: 'range', en: 'Equity', local: { 'zh-TW': '勝率', ja: 'エクイティ', ko: '에퀴티', es: 'Equity' }, desc: { en: 'Your share of the pot in the long run if all cards were dealt out.', 'zh-TW': '若一路發到攤牌，這手牌長期平均能贏得底池的比例。' } },
    { category: 'range', en: 'Equity Realization', local: { 'zh-TW': '勝率實現', ja: 'エクイティ実現', ko: '에퀴티 실현', es: 'Realizacion de equity' }, desc: { en: 'How much of a hand’s theoretical equity can actually be converted into EV through future streets.', 'zh-TW': '理論勝率能不能真的透過後續行動轉成 EV；位置差、容易被迫棄牌時，勝率實現會變差。' } },
    { category: 'range', en: 'Fold Equity', local: { 'zh-TW': '棄牌率收益', ja: 'フォールドエクイティ', ko: '폴드 에퀴티', es: 'Fold equity' }, desc: { en: 'The value gained when your bet makes opponents fold.', 'zh-TW': '下注讓對手棄牌時額外得到的收益。' } },
    { category: 'range', en: 'Showdown Value', local: { 'zh-TW': '攤牌價值', ja: 'ショーダウンバリュー', ko: '쇼다운 밸류', es: 'Valor al showdown' }, desc: { en: 'A hand that can win often enough if it reaches showdown.', 'zh-TW': '若能進入攤牌，仍有一定機率贏的牌。' } },
    { category: 'range', en: 'Protection', local: { 'zh-TW': '保護下注', ja: 'プロテクション', ko: '프로텍션', es: 'Proteccion' }, desc: { en: 'Betting to deny free cards to hands that can overtake you.', 'zh-TW': '用下注避免對手免費看牌追上你的牌。' } },
    { category: 'math', en: 'Pot Odds', local: { 'zh-TW': '底池賠率', ja: 'ポットオッズ', ko: '팟 오즈', es: 'Pot odds' }, desc: { en: 'The price of calling compared with the pot you can win.', 'zh-TW': '跟注成本與可贏底池之間的比例。' } },
    { category: 'math', en: 'Implied Odds', local: { 'zh-TW': '隱含賠率', ja: 'インプライドオッズ', ko: '임플라이드 오즈', es: 'Odds implicitas' }, desc: { en: 'Extra money you expect to win later when your draw improves.', 'zh-TW': '若後續成牌，預期還能從對手身上多贏到的籌碼。' } },
    { category: 'math', en: 'Reverse Implied Odds', local: { 'zh-TW': '反向隱含賠率', ja: 'リバースインプライドオッズ', ko: '리버스 임플라이드 오즈', es: 'Odds implicitas inversas' }, desc: { en: 'Future loss risk when improving still leaves you second-best.', 'zh-TW': '即使補到牌仍可能輸給更強牌，導致未來多輸的風險。' } },
    { category: 'math', en: 'Expected Value (EV)', local: { 'zh-TW': '期望值', ja: '期待値', ko: '기댓값', es: 'Valor esperado' }, desc: { en: 'The average long-term result of a decision.', 'zh-TW': '某個決策長期平均會賺或虧多少。' } },
    { category: 'math', en: 'Runout', local: { 'zh-TW': '後續公共牌', ja: 'ランアウト', ko: '런아웃', es: 'Runout' }, desc: { en: 'The sequence of community cards by the end of the hand.', 'zh-TW': '一手牌從翻牌到河牌形成的公共牌走勢。' } },
    { category: 'math', en: 'Stack', local: { 'zh-TW': '籌碼量', ja: 'スタック', ko: '스택', es: 'Stack' }, desc: { en: 'The chips a player has in front of them.', 'zh-TW': '玩家目前持有的籌碼。' } },
    { category: 'math', en: 'Effective Stack', local: { 'zh-TW': '有效籌碼', ja: '有効スタック', ko: '유효 스택', es: 'Stack efectivo' }, desc: { en: 'The most two involved players can win or lose against each other.', 'zh-TW': '雙方實際能互相贏輸的最大籌碼量，通常取較短的一方。' } },
    { category: 'math', en: 'Stack-to-Pot Ratio (SPR)', local: { 'zh-TW': '籌碼底池比', ja: 'SPR', ko: 'SPR', es: 'SPR' }, desc: { en: 'Effective stack divided by the pot; lower SPR makes commitment decisions arrive faster.', 'zh-TW': '有效籌碼除以底池；SPR 越低，越快進入是否願意打光的決策。' } },
    { category: 'math', en: 'Big Blind Unit (bb)', local: { 'zh-TW': '大盲單位', ja: 'bb単位', ko: 'bb 단위', es: 'Unidad bb' }, desc: { en: 'A stack or bet unit measured in big blinds.', 'zh-TW': '用大盲注衡量下注與籌碼深度的單位。' } },
    { category: 'math', en: 'Outs', local: { 'zh-TW': '補牌張數', ja: 'アウツ', ko: '아웃츠', es: 'Outs' }, desc: { en: 'Cards that can improve your hand to the winner.', 'zh-TW': '能讓你改善成可能勝出牌型的牌張數。' } },
    { category: 'math', en: 'VPIP', local: { 'zh-TW': '自願入池率', ja: 'VPIP', ko: 'VPIP', es: 'VPIP' }, desc: { en: 'How often a player voluntarily puts money into the pot preflop.', 'zh-TW': '玩家翻牌前自願入池的頻率，不含被迫支付盲注。' } },
    { category: 'math', en: 'PFR', local: { 'zh-TW': '翻前加注率', ja: 'PFR', ko: 'PFR', es: 'PFR' }, desc: { en: 'How often a player raises preflop.', 'zh-TW': '玩家翻牌前主動加注的頻率。' } },
    { category: 'math', en: 'Rake', local: { 'zh-TW': '抽水', ja: 'レーキ', ko: '레이크', es: 'Rake' }, desc: { en: 'The fee taken by the poker room from pots or tournaments.', 'zh-TW': '牌室從底池或賽事中收取的費用。' } },
    { category: 'tournament', en: 'ICM', local: { 'zh-TW': '獨立籌碼模型', ja: 'ICM', ko: 'ICM', es: 'ICM' }, desc: { en: 'A tournament model that converts chip stacks into prize-equity pressure.', 'zh-TW': '錦標賽中把籌碼量轉換成獎金價值壓力的模型。' } },
    { category: 'tournament', en: 'Bubble', local: { 'zh-TW': '泡沫期', ja: 'バブル', ko: '버블', es: 'Burbuja' }, desc: { en: 'The stage just before players reach paid places.', 'zh-TW': '即將進入獎金圈前的階段。' } },
    { category: 'tournament', en: 'In the Money (ITM)', local: { 'zh-TW': '進入獎金圈', ja: 'インザマネー', ko: '인 더 머니', es: 'En premios' }, desc: { en: 'A tournament finish that has secured a payout.', 'zh-TW': '錦標賽已確定至少拿到獎金。' } },
    { category: 'tournament', en: 'Chip EV', local: { 'zh-TW': '籌碼期望值', ja: 'チップEV', ko: '칩 EV', es: 'Chip EV' }, desc: { en: 'Expected value measured in chips rather than prize money.', 'zh-TW': '以籌碼增減衡量的期望值，不直接等於獎金價值。' } },
    { category: 'tournament', en: 'ROI', local: { 'zh-TW': '投資報酬率', ja: 'ROI', ko: 'ROI', es: 'ROI' }, desc: { en: 'Return on investment across tournaments or sessions.', 'zh-TW': '長期投入成本與獲利之間的報酬比例。' } },
    { category: 'tournament', en: 'Rebuy', local: { 'zh-TW': '重買', ja: 'リバイ', ko: '리바이', es: 'Rebuy' }, desc: { en: 'Buy back into an event when rules allow it.', 'zh-TW': '規則允許時，在出局或籌碼過少後重新買入。' } },
    { category: 'tournament', en: 'Add-on', local: { 'zh-TW': '加碼買入', ja: 'アドオン', ko: '애드온', es: 'Add-on' }, desc: { en: 'Purchase extra chips at a scheduled point in a tournament.', 'zh-TW': '在指定時間額外購買籌碼。' } },
    { category: 'tournament', en: 'Overlay', local: { 'zh-TW': '保證獎池補貼', ja: 'オーバーレイ', ko: '오버레이', es: 'Overlay' }, desc: { en: 'When the guaranteed prize pool exceeds entries and the organizer covers the gap.', 'zh-TW': '報名費未達保證獎池，主辦方補足差額。' } },
    { category: 'tournament', en: 'Final Table', local: { 'zh-TW': '決賽桌', ja: 'ファイナルテーブル', ko: '파이널 테이블', es: 'Mesa final' }, desc: { en: 'The last table remaining in a tournament.', 'zh-TW': '錦標賽剩最後一桌玩家的階段。' } },
    { category: 'tournament', en: 'Bad Beat', local: { 'zh-TW': '爆冷輸牌', ja: 'バッドビート', ko: '배드 비트', es: 'Bad beat' }, desc: { en: 'A strong favorite loses after unlikely later cards.', 'zh-TW': '原本大幅領先的牌，被後續小機率牌逆轉。' } },
    { category: 'tournament', en: 'Tilt', local: { 'zh-TW': '情緒失控', ja: 'ティルト', ko: '틸트', es: 'Tilt' }, desc: { en: 'Emotional play that leads to worse decisions.', 'zh-TW': '因情緒波動導致決策品質下降。' } },
    { category: 'tournament', en: 'Bankroll', local: { 'zh-TW': '牌局資金', ja: 'バンクロール', ko: '뱅크롤', es: 'Bankroll' }, desc: { en: 'Money set aside for poker play and risk management.', 'zh-TW': '專門用來打牌與控管風險的資金。' } },
    { category: 'tournament', en: 'Regular (Reg)', local: { 'zh-TW': '常客', ja: 'レギュラー', ko: '레귤러', es: 'Regular' }, desc: { en: 'A frequent player with established habits or skill.', 'zh-TW': '常出現在牌桌、通常有固定打法與經驗的玩家。' } },
    { category: 'tournament', en: 'Fish', local: { 'zh-TW': '弱玩家', ja: 'フィッシュ', ko: '피쉬', es: 'Fish' }, desc: { en: 'Slang for a weak player; avoid using it directly at the table.', 'zh-TW': '指技術較弱的玩家，帶貶義，實際交流時避免直接稱呼。' } },
    { category: 'tournament', en: 'Shark', local: { 'zh-TW': '強玩家', ja: 'シャーク', ko: '샤크', es: 'Shark' }, desc: { en: 'Slang for a strong winning player.', 'zh-TW': '指技術強、長期有優勢的玩家。' } },
    { category: 'tournament', en: 'Slow Play', local: { 'zh-TW': '慢打', ja: 'スロープレイ', ko: '슬로우 플레이', es: 'Slow play' }, desc: { en: 'Play a strong hand passively to induce action.', 'zh-TW': '拿強牌時故意不快速加大底池，誘導對手下注。' } },
    { category: 'tournament', en: 'Hero Call', local: { 'zh-TW': '英雄跟注', ja: 'ヒーローコール', ko: '히어로 콜', es: 'Hero call' }, desc: { en: 'A difficult call with a marginal hand, expecting the opponent to be bluffing.', 'zh-TW': '用邊緣牌力做困難跟注，判斷對手詐唬。' } },
    { category: 'tournament', en: 'Hero Fold', local: { 'zh-TW': '英雄棄牌', ja: 'ヒーローフォールド', ko: '히어로 폴드', es: 'Hero fold' }, desc: { en: 'A disciplined fold with a strong-looking hand.', 'zh-TW': '拿看似不錯的牌仍判斷落後而棄牌。' } },
    { category: 'tournament', en: 'Chop', local: { 'zh-TW': '平分底池', ja: 'チョップ', ko: '찹', es: 'Chop' }, desc: { en: 'Split the pot because players have equal winning hands.', 'zh-TW': '雙方牌力相同時平分底池。' } },
    { category: 'tournament', en: 'Sitting Out', local: { 'zh-TW': '暫離牌桌', ja: 'シットアウト', ko: '싯아웃', es: 'Sitting out' }, desc: { en: 'Temporarily not participating in hands.', 'zh-TW': '暫時離開牌桌或不參與牌局。' } }
]);
const DRILL_TYPES = /** @type {const} */ ({
    RFI_FOCUS: 'RFI_FOCUS',
    DEFENSE_VS_OPEN: 'DEFENSE_VS_OPEN',
    FACING_3BET: 'FACING_3BET',
    PUSH_FOLD: 'PUSH_FOLD',
    ALL_STREET: 'ALL_STREET'
});
const DRILL_RANDOM_VALUE = 'ALL';
const DRILL_RFI_POSITIONS = ['UTG', 'HJ', 'CO', 'BTN', 'SB'];
const DRILL_3BETTER_POSITIONS = ['HJ', 'CO', 'BTN', 'SB', 'BB'];
const DRILL_OPEN_SIZE_OPTIONS = [2, 2.2, 2.5, 3];
const GAME_TYPES = /** @type {const} */ ({ CASH: 'CASH', TOURNAMENT: 'TOURNAMENT' });
const ALL_STREET_STREETS = ['FLOP', 'TURN', 'RIVER'];
const ALL_STREET_TEMPLATE_OPTIONS = ['CBET_FLOP', 'CHECK_RAISE_FLOP', 'PROBE_TURN', 'BARREL_TURN', 'BLUFF_CATCH_RIVER', 'VALUE_BET_RIVER', 'FACING_OVERBET'];
const ALL_STREET_TEMPLATE_BY_STREET = Object.freeze({
    FLOP: ['CBET_FLOP', 'CHECK_RAISE_FLOP'],
    TURN: ['PROBE_TURN', 'BARREL_TURN'],
    RIVER: ['BLUFF_CATCH_RIVER', 'VALUE_BET_RIVER', 'FACING_OVERBET']
});
const CARD_SUIT_CODES = Object.freeze(['s', 'h', 'd', 'c']);
const CARD_SUIT_CODE_BY_NAME = Object.freeze({
    spades: 's',
    hearts: 'h',
    diamonds: 'd',
    clubs: 'c',
    s: 's',
    h: 'h',
    d: 'd',
    c: 'c'
});
const BOARD_RANK_VALUES = Object.freeze({
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
});
const ALL_STREET_BOARD_PRESET_ALIASES = Object.freeze({
    GOOD: 'DRY',
    NORMAL: 'NEUTRAL',
    BAD: 'WET'
});
const ALL_STREET_BOARD_PRESETS = Object.freeze({
    DRY: {
        boardTexture: ['dry', 'rainbow', 'disconnected']
    },
    NEUTRAL: {
        boardTexture: ['medium-card', 'semi-connected']
    },
    WET: {
        boardTexture: ['wet', 'two-tone', 'connected', 'draw-completer']
    },
    PAIRED: {
        boardTexture: ['paired']
    }
});
const ALL_STREET_POT_PRESETS = Object.freeze({
    SMALL: { potBb: 6.5, previousAction: ['BTN opens 2.5bb', 'BB calls'] },
    MEDIUM: { potBb: 18, previousAction: ['BTN opens 2.5bb', 'BB calls', 'flop bet gets called'] },
    LARGE: { potBb: 42, previousAction: ['BTN opens 2.5bb', 'BB calls', 'flop bet gets called', 'turn bet gets called'] }
});
const ALL_STREET_HAND_QUALITY_PRESETS = Object.freeze({
    GOOD: {
        raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', 'AKs', 'AQs', 'AJs', 'KQs', 'QJs'],
        call: ['99', '88', 'ATs', 'KJs', 'JTs', 'T9s']
    },
    NORMAL: {
        raise: ['AA', 'KK', 'AKs', 'AQs', 'KQs'],
        call: ['QQ', 'JJ', 'TT', '99', 'AJs', 'ATs', 'KJs', 'QJs', 'JTs']
    },
    BAD: {
        raise: ['A5s', 'A4s', 'KTs', 'QTs'],
        call: ['AJs', 'KQs', 'QJs', 'JTs'],
        fold: ['K9s', 'Q9s', '98s', '87s', '76s', '65s']
    }
});
const ALL_STREET_RAISE_SIZE_PRESETS = Object.freeze({
    BET_33: { label: 'Bet 33%', sizing: '33% pot' },
    BET_50: { label: 'Bet 50%', sizing: '50% pot' },
    BET_75: { label: 'Bet 75%', sizing: '75% pot' },
    OVERBET: { label: 'Overbet', sizing: '125% pot' },
    JAM: { label: 'Jam', sizing: 'All-in' }
});
const ALL_STREET_STREET_I18N_KEYS = Object.freeze({
    FLOP: 'drillStreetFlop',
    TURN: 'drillStreetTurn',
    RIVER: 'drillStreetRiver'
});
const ALL_STREET_TEMPLATE_I18N_KEYS = Object.freeze({
    CBET_FLOP: 'drillTemplateCbetFlop',
    CHECK_RAISE_FLOP: 'drillTemplateCheckRaiseFlop',
    PROBE_TURN: 'drillTemplateProbeTurn',
    BARREL_TURN: 'drillTemplateBarrelTurn',
    BLUFF_CATCH_RIVER: 'drillTemplateBluffCatchRiver',
    VALUE_BET_RIVER: 'drillTemplateValueBetRiver',
    FACING_OVERBET: 'drillTemplateFacingOverbet'
});
const POSTFLOP_SIZE_I18N_KEYS = Object.freeze({
    'Check': 'postflopActionCheck',
    'Fold': 'postflopActionFold',
    'Call': 'postflopActionCall',
    '33% pot': 'postflopSizeBet33',
    '50% pot': 'postflopSizeBet50',
    '66% pot': 'postflopSizeBet66',
    '75% pot': 'postflopSizeBet75',
    'Raise 55% pot': 'postflopActionRaise55',
    'Probe 27%': 'postflopActionProbe27',
    'Probe 73%': 'postflopActionProbe73',
    'Value 33%': 'postflopActionValue33',
    'Value 75%': 'postflopActionValue75',
    'Call all-in': 'postflopActionCallJam',
    'Raise 55%': 'postflopActionRaise55',
    '75% pot': 'postflopSizeBet75',
    'Call Jam': 'postflopActionCallJam',
    'Bet 33%': 'postflopSizeBet33',
    'Bet 50%': 'postflopSizeBet50',
    'Bet 75%': 'postflopSizeBet75',
    'Overbet': 'postflopActionOverbet',
    'Jam': 'postflopActionJam',
    'All-in': 'postflopActionJam'
});
const BOARD_TEXTURE_I18N_KEYS = Object.freeze({
    'ace-high': 'boardTextureAceHigh',
    rainbow: 'boardTextureRainbow',
    disconnected: 'boardTextureDisconnected',
    dry: 'boardTextureDry',
    paired: 'boardTexturePaired',
    'two-tone': 'boardTextureTwoTone',
    'low-card': 'boardTextureLowCard',
    'broadway-heavy': 'boardTextureBroadwayHeavy',
    'medium-card': 'boardTextureMediumCard',
    'semi-connected': 'boardTextureSemiConnected',
    connected: 'boardTextureConnected',
    wet: 'boardTextureWet',
    'monotone-turn': 'boardTextureMonotoneTurn',
    'draw-completer': 'boardTextureDrawCompleter',
    'missed-draw-relevant': 'boardTextureMissedDrawRelevant',
    static: 'boardTextureStatic',
    polarized: 'boardTexturePolarized'
});
const ASSESSMENT_FIELDS = ['experience', 'gameType', 'stackFocus', 'confidence'];
const LANGUAGE_OPTIONS = Object.freeze([
    { code: 'en', label: 'English', shortLabel: 'EN' },
    { code: 'zh-TW', label: '繁體中文', shortLabel: '繁' },
    { code: 'zh-CN', label: '简体中文', shortLabel: '简' },
    { code: 'ja', label: '日本語', shortLabel: '日' },
    { code: 'ko', label: '한국어', shortLabel: '한' },
    { code: 'es', label: 'Español', shortLabel: 'ES' }
]);
const SUPPORTED_LANGS = LANGUAGE_OPTIONS.map(option => option.code);
const POSTFLOP_SOURCE_REFS = Object.freeze([
    {
        title: 'The Mechanics of C-Bet Sizing',
        url: 'https://blog.gtowizard.com/the-mechanics-of-c-bet-sizing/',
        concepts: ['range advantage', 'nut advantage', 'fold equity', 'SPR', 'flop sizing']
    },
    {
        title: 'The Turn Probe Bet',
        url: 'https://blog.gtowizard.com/the-turn-probe-bet/',
        concepts: ['probe turn', 'draw-completer turns', 'overcard turns', 'brick turns']
    },
    {
        title: 'Understanding Blockers in Poker',
        url: 'https://blog.gtowizard.com/understanding-blockers-in-poker/',
        concepts: ['river bluff-catching', 'pot odds', 'blockers', 'polarized ranges']
    },
    {
        title: 'All you need to know about our solutions',
        url: 'https://blog.gtowizard.com/all-you-need-to-know-about-our-solutions/',
        concepts: ['solver tree sizing', 'turn barrels', 'overbets', 'river sizes']
    },
    {
        title: 'Defending vs BB Check-Raise on Paired Flops',
        url: 'https://blog.gtowizard.com/defending-vs-bb-check-raise-on-paired-flops/',
        concepts: ['flop check-raise', 'paired boards', 'defense vs raise']
    },
    {
        title: 'Are You Leaving Value on the River?',
        url: 'https://blog.gtowizard.com/are_you_leaving_value_on_the_river/',
        concepts: ['river value bet', 'thin value', 'smaller river sizing']
    }
]);

const ALL_STREET_PACKS = Object.freeze({
    sourceReviewedCash100: {
        id: 'source-reviewed-cash100-postflop-v1',
        version: 1,
        label: 'Source-Reviewed Cash 100bb Postflop Pack',
        gameType: GAME_TYPES.CASH,
        assumptions: '6-max cash, mostly BTN vs BB single-raised pots, 100bb effective, simplified hand-class ranges',
        sourceReviewStatus: 'source-reviewed',
        sourceNotes: 'Source-reviewed solver-derived training reference with simplified hand-class ranges; not a universal rule or complete solver database.',
        sourceRefs: POSTFLOP_SOURCE_REFS,
        supportedTemplates: ALL_STREET_TEMPLATE_OPTIONS,
        streetCoverage: ['FLOP', 'TURN', 'RIVER'],
        boardTextureCoverage: ['paired', 'monotone', 'two-tone', 'rainbow', 'connected', 'disconnected', 'broadway-heavy', 'ace-high', 'low-card', 'wet', 'dry', 'missed-draw-relevant']
    }
});

const STRATEGY_PACKS = {
    RFI: {
        id: 'starter-rfi-v1',
        version: 1,
        label: 'Starter RFI Reference',
        assumptions: '6-max baseline, no ante',
        sourceNotes: 'Training reference, not a universal rule.'
    },
    DEFEND: {
        id: 'starter-defense-v1',
        version: 1,
        label: 'Starter Defense Reference',
        assumptions: 'Common late-position open spots',
        sourceNotes: 'Training reference, not a universal rule.'
    },
    PUSH_FOLD: {
        id: 'starter-pushfold-v1',
        version: 1,
        label: 'Tournament Push/Fold Reference',
        assumptions: '6bb to 15bb short-stack spots',
        sourceNotes: 'Training reference, not a universal rule.'
    },
    ALL_STREET: {
        ...ALL_STREET_PACKS.sourceReviewedCash100
    }
};

const ALL_STREET_SCENARIOS = Object.freeze([
    {
        id: 'starter_flop_cbet_a72r',
        version: 1,
        packId: ALL_STREET_PACKS.sourceReviewedCash100.id,
        name: 'Flop C-Bet: A-high dry board',
        template: 'CBET_FLOP',
        street: 'FLOP',
        boardCards: ['As', '7d', '2c'],
        boardTexture: ['ace-high', 'rainbow', 'disconnected', 'dry'],
        heroPosition: 'BTN',
        villainPosition: 'BB',
        potBb: 6.5,
        effectiveStackBb: 94,
        spr: 14.46,
        previousAction: ['BTN opens 2.5bb', 'BB calls'],
        availableSizes: ['Check', '33% pot', '66% pot'],
        availableActions: ['Fold', 'Raise'],
        actionLabels: { Fold: 'Check', Raise: '33% pot' },
        defaultAction: 'Fold',
        comboActions: {
            Raise: ['AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A5s', 'A4s', 'KQs', 'QJs'],
            Fold: ['98s', '87s', '76s', '65s']
        },
        explanation: 'Dry ace-high boards give the preflop raiser range and nut advantage. Bet small with strong Ax, top-set value, and blocker-heavy air; check hands with poor equity realization.'
    },
    {
        id: 'starter_flop_checkraise_884tt',
        version: 1,
        packId: ALL_STREET_PACKS.sourceReviewedCash100.id,
        name: 'Flop Check-Raise: paired low board',
        template: 'CHECK_RAISE_FLOP',
        street: 'FLOP',
        boardCards: ['8s', '8d', '4c'],
        boardTexture: ['paired', 'two-tone', 'low-card', 'dry'],
        heroPosition: 'BB',
        villainPosition: 'BTN',
        potBb: 6.5,
        effectiveStackBb: 94,
        spr: 14.46,
        previousAction: ['BTN opens 2.5bb', 'BB calls', 'BB checks', 'BTN bets 33% pot'],
        availableSizes: ['Fold', 'Call', 'Raise 55% pot'],
        availableActions: ['Fold', 'Call', 'Raise'],
        actionLabels: { Fold: 'Fold', Call: 'Call', Raise: 'Raise 55%' },
        defaultAction: 'Fold',
        comboActions: {
            Raise: ['88', '44', 'A8s', 'K8s', 'Q8s', '98s', '87s', '76s'],
            Call: ['99', '77', '66', '55', 'A4s', 'K4s', 'T9s']
        },
        explanation: 'Paired boards can give the big blind more trips and protection raises. Check-raise trips, boats, and selected backdoor or blocker-heavy bluffs; call medium showdown value.'
    },
    {
        id: 'starter_turn_barrel_ksqs5d2c',
        version: 1,
        packId: ALL_STREET_PACKS.sourceReviewedCash100.id,
        name: 'Turn Barrel: broadway-heavy two-tone board',
        template: 'BARREL_TURN',
        street: 'TURN',
        boardCards: ['Ks', 'Qs', '5d', '2c'],
        boardTexture: ['broadway-heavy', 'two-tone', 'connected', 'wet'],
        heroPosition: 'BTN',
        villainPosition: 'BB',
        potBb: 13.5,
        effectiveStackBb: 86,
        spr: 6.37,
        previousAction: ['BTN opens 2.5bb', 'BB calls', 'BTN bets 33% pot on flop', 'BB calls'],
        availableSizes: ['Check', '50% pot', '75% pot'],
        availableActions: ['Fold', 'Raise'],
        actionLabels: { Fold: 'Check', Raise: '75% pot' },
        defaultAction: 'Fold',
        comboActions: {
            Raise: ['KK', 'QQ', 'AKs', 'KQs', 'AsJs', 'AsTs', 'AJs', 'ATs'],
            Fold: ['76s', '65s', '54s']
        },
        explanation: 'The turn keeps strong broadway value and high-equity blocker bluffs in the betting range. Continue with hands that pressure one-pair bluff-catchers and check weak showdown or low-equity air.'
    },
    {
        id: 'starter_turn_probe_9h6h2c8h',
        version: 1,
        packId: ALL_STREET_PACKS.sourceReviewedCash100.id,
        name: 'Turn Probe: draw-completing card',
        template: 'PROBE_TURN',
        street: 'TURN',
        boardCards: ['9h', '6h', '2c', '8h'],
        boardTexture: ['monotone-turn', 'connected', 'wet', 'draw-completer'],
        heroPosition: 'BB',
        villainPosition: 'BTN',
        potBb: 6.5,
        effectiveStackBb: 94,
        spr: 14.46,
        previousAction: ['BTN opens 2.5bb', 'BB calls', 'flop checks through'],
        availableSizes: ['Check', 'Probe 27%', 'Probe 73%'],
        availableActions: ['Fold', 'Raise'],
        actionLabels: { Fold: 'Check', Raise: 'Probe 27%' },
        defaultAction: 'Fold',
        comboActions: {
            Raise: ['AhKh', 'KhQh', 'QhJh', 'JhTh', 'T9s', '87s', '98s', '66', '99'],
            Fold: ['AJo', 'KQo', '54s']
        },
        explanation: 'When the turn completes draws after the preflop raiser checks back, the caller can gain EV by probing. Use smaller probes with made draws and equity-denial hands; check air without leverage.'
    },
    {
        id: 'starter_river_bluffcatch_jt722',
        version: 1,
        packId: ALL_STREET_PACKS.sourceReviewedCash100.id,
        name: 'River Bluff-Catch: paired missed-draw board',
        template: 'BLUFF_CATCH_RIVER',
        street: 'RIVER',
        boardCards: ['Jh', 'Ts', '7s', '2d', '2c'],
        boardTexture: ['paired', 'two-tone', 'connected', 'missed-draw-relevant'],
        heroPosition: 'BB',
        villainPosition: 'BTN',
        potBb: 42,
        effectiveStackBb: 64,
        spr: 1.52,
        previousAction: ['BTN opens 2.5bb', 'BB calls', 'BTN c-bets flop', 'BB calls', 'turn checks through', 'BTN bets river 75% pot'],
        availableSizes: ['Fold', 'Call'],
        availableActions: ['Fold', 'Call'],
        actionLabels: { Fold: 'Fold', Call: 'Call' },
        defaultAction: 'Fold',
        comboActions: {
            Call: ['KJs', 'QJs', 'AJs', 'JTs', 'T9s'],
            Fold: ['98s', '87s', '76s']
        },
        explanation: 'Paired rivers after missed draws reward bluff-catchers that block value or unblock bluffs. Call selected top-pair hands with useful blockers; fold hands with poor blocker properties.'
    },
    {
        id: 'starter_river_value_akq62',
        version: 1,
        packId: ALL_STREET_PACKS.sourceReviewedCash100.id,
        name: 'River Value Bet: thin value on broadway runout',
        template: 'VALUE_BET_RIVER',
        street: 'RIVER',
        boardCards: ['Ah', 'Kd', 'Qs', '6c', '2d'],
        boardTexture: ['broadway-heavy', 'rainbow', 'dry', 'static'],
        heroPosition: 'BTN',
        villainPosition: 'BB',
        potBb: 28,
        effectiveStackBb: 76,
        spr: 2.71,
        previousAction: ['BTN opens 2.5bb', 'BB calls', 'BTN bets flop', 'BB calls', 'turn checks through'],
        availableSizes: ['Check', 'Value 33%', 'Value 75%'],
        availableActions: ['Fold', 'Raise'],
        actionLabels: { Fold: 'Check', Raise: 'Value 33%' },
        defaultAction: 'Fold',
        comboActions: {
            Raise: ['AA', 'KK', 'QQ', 'AKs', 'AQs', 'KQs', 'AJo', 'ATs'],
            Fold: ['99', '88', '76s', '65s']
        },
        explanation: 'River value betting is not only nutted hands. Thin value can use smaller sizing when worse bluff-catchers continue and raises are less threatening.'
    },
    {
        id: 'starter_river_facing_overbet_ak6jt',
        version: 1,
        packId: ALL_STREET_PACKS.sourceReviewedCash100.id,
        name: 'Facing Overbet: polarized river pressure',
        template: 'FACING_OVERBET',
        street: 'RIVER',
        boardCards: ['As', 'Kh', '6s', 'Jc', 'Td'],
        boardTexture: ['broadway-heavy', 'connected', 'wet', 'polarized'],
        heroPosition: 'BB',
        villainPosition: 'BTN',
        potBb: 52,
        effectiveStackBb: 58,
        spr: 1.12,
        previousAction: ['BTN opens 2.5bb', 'BB calls', 'BTN overbets flop', 'BB calls', 'BTN barrels turn', 'BB calls', 'BTN jams river'],
        availableSizes: ['Fold', 'Call all-in'],
        availableActions: ['Fold', 'Call'],
        actionLabels: { Fold: 'Fold', Call: 'Call Jam' },
        defaultAction: 'Fold',
        comboActions: {
            Call: ['QJs', 'QTs', 'KQs', 'AJs', 'ATs'],
            Fold: ['K9s', 'Q9s', '98s', '76s']
        },
        explanation: 'Against polarized overbets, start with pot odds, then keep hands that block value or unblock missed draws. Medium-strength hands without useful blockers overfold.'
    }
]);

const ALL_STREET_PRACTICE_ORDER = Object.freeze([
    'starter_flop_cbet_a72r',
    'starter_turn_barrel_ksqs5d2c',
    'starter_river_bluffcatch_jt722',
    'starter_flop_checkraise_884tt',
    'starter_turn_probe_9h6h2c8h',
    'starter_river_value_akq62',
    'starter_river_facing_overbet_ak6jt'
]);

function getLanguageOption(lang) {
    return LANGUAGE_OPTIONS.find(option => option.code === lang) || LANGUAGE_OPTIONS[0];
}

function normalizeLanguage(value) {
    if (!value) return null;
    const raw = String(value).trim();
    if (SUPPORTED_LANGS.includes(raw)) return raw;
    const lower = raw.toLowerCase();
    if (lower === 'zh-cn' || lower.startsWith('zh-cn-') || lower === 'zh-sg' || lower.startsWith('zh-sg-') || lower.includes('hans')) return 'zh-CN';
    if (lower === 'zh-tw' || lower.startsWith('zh-tw-') || lower === 'zh-hk' || lower.startsWith('zh-hk-') || lower === 'zh-mo' || lower.startsWith('zh-mo-') || lower.includes('hant')) return 'zh-TW';
    const matched = LANGUAGE_OPTIONS.find(option => {
        const code = option.code.toLowerCase();
        return lower === code || lower.startsWith(`${code}-`);
    });
    if (lower.startsWith('zh')) return 'zh-TW';
    return matched ? matched.code : null;
}

function detectPreferredLanguage(nav = (typeof navigator !== 'undefined' ? navigator : null)) {
    const candidates = [];
    if (nav && Array.isArray(nav.languages)) candidates.push(...nav.languages);
    if (nav && nav.language) candidates.push(nav.language);
    if (nav && nav.userLanguage) candidates.push(nav.userLanguage);
    for (const candidate of candidates) {
        const lang = normalizeLanguage(candidate);
        if (lang) return lang;
    }
    return 'en';
}

// ============================================================
// RAISE FIRST IN RANGES (by position)
// ============================================================
const RFI_RANGES = {
    UTG: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', 'AKs', 'AQs', 'AJs', 'ATs', 'KQs', 'KJs', 'KTs', 'QJs', 'QTs', 'JTs', 'T9s', 'AKo', 'AQo']),
    HJ: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'QJs', 'QTs', 'Q9s', 'JTs', 'J9s', 'T9s', '98s', '87s', 'AKo', 'AQo', 'AJo', 'ATo', 'KQo']),
    CO: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'QJs', 'QTs', 'Q9s', 'Q8s', 'JTs', 'J9s', 'J8s', 'T9s', 'T8s', '98s', '87s', '76s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'KQo', 'KJo', 'KTo', 'QJo']),
    BTN: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'JTs', 'J9s', 'J8s', 'J7s', 'T9s', 'T8s', 'T7s', '98s', '97s', '87s', '86s', '76s', '75s', '65s', '54s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'KQo', 'KJo', 'KTo', 'K9o', 'QJo', 'QTo', 'Q9o', 'JTo', 'J9o', 'T9o']),
};
RFI_RANGES.SB = RFI_RANGES.BTN;

// ============================================================
// PUSH / FOLD RANGES (multiple stack sizes)
// ============================================================
const PUSH_6BB = {
    UTG: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'QJs', 'QTs', 'Q9s', 'JTs', 'T9s', '98s', '87s', '76s', '65s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'KQo', 'KJo', 'KTo', 'QJo', 'JTo']),
    HJ: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'QJs', 'QTs', 'Q9s', 'Q8s', 'JTs', 'J9s', 'T9s', 'T8s', '98s', '87s', '76s', '65s', '54s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'KQo', 'KJo', 'KTo', 'K9o', 'QJo', 'QTo', 'JTo']),
    CO: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'JTs', 'J9s', 'J8s', 'T9s', 'T8s', '98s', '87s', '76s', '65s', '54s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'KQo', 'KJo', 'KTo', 'K9o', 'QJo', 'QTo', 'Q9o', 'JTo', 'T9o']),
};
PUSH_6BB.BTN = new Set([...PUSH_6BB.CO, 'K5s', 'K4s', 'K3s', 'K2s', 'Q6s', 'Q5s', 'Q4s', 'J7s', 'J6s', 'T7s', '97s', '86s', '75s', 'A4o', 'A3o', 'A2o', 'K8o', 'K7o', 'Q8o', 'J9o', 'J8o', 'T8o', '98o', '87o']);
PUSH_6BB.SB = new Set([...PUSH_6BB.BTN, 'Q3s', 'Q2s', 'J5s', 'J4s', 'T6s', '96s', '85s', '74s', 'K6o', 'K5o', 'Q7o', 'J7o', 'T7o', '97o', '76o']);
PUSH_6BB.BB = PUSH_6BB.SB;

const PUSH_8BB = {
    UTG: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'QJs', 'QTs', 'Q9s', 'JTs', 'T9s', '98s', '87s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'KQo', 'KJo']),
    HJ: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'QJs', 'QTs', 'Q9s', 'JTs', 'J9s', 'T9s', '98s', '87s', '76s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'KQo', 'KJo', 'KTo', 'QJo']),
    CO: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'QJs', 'QTs', 'Q9s', 'Q8s', 'JTs', 'J9s', 'T9s', 'T8s', '98s', '87s', '76s', '65s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'KQo', 'KJo', 'KTo', 'QJo', 'QTo', 'JTo']),
};
PUSH_8BB.BTN = new Set([...PUSH_8BB.CO, 'K6s', 'K5s', 'Q7s', 'J8s', 'T7s', '97s', '86s', '75s', '65s', '54s', 'A5o', 'A4o', 'A3o', 'A2o', 'K9o', 'K8o', 'Q9o', 'Q8o', 'J9o', 'J8o', 'T9o', 'T8o', '98o']);
PUSH_8BB.SB = new Set([...PUSH_8BB.BTN, 'K4s', 'K3s', 'K2s', 'Q6s', 'Q5s', 'J7s', '96s', '85s', '74s', 'K7o', 'K6o', 'Q7o', 'J7o', 'T7o', '97o', '87o', '76o']);
PUSH_8BB.BB = PUSH_8BB.SB;

const PUSH_10BB = {
    UTG: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'KQs', 'KJs', 'KTs', 'QJs', 'QTs', 'JTs', 'T9s', 'AKo', 'AQo', 'AJo', 'ATo', 'KQo']),
    HJ: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'KQs', 'KJs', 'KTs', 'K9s', 'QJs', 'QTs', 'Q9s', 'JTs', 'T9s', '98s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'KQo', 'KJo']),
    CO: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'QJs', 'QTs', 'Q9s', 'Q8s', 'JTs', 'J9s', 'T9s', 'T8s', '98s', '87s', '76s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A5o', 'KQo', 'KJo', 'KTo', 'QJo']),
};
PUSH_10BB.BTN = new Set([...PUSH_10BB.CO, 'K6s', 'K5s', 'K4s', 'K3s', 'K2s', 'Q7s', 'Q6s', 'Q5s', 'J8s', 'J7s', 'T7s', '97s', '86s', '65s', 'A6o', 'A4o', 'A3o', 'A2o', 'K9o', 'K8o', 'QTo', 'Q9o', 'JTo']);
PUSH_10BB.SB = new Set([...PUSH_10BB.BTN, 'Q4s', 'Q3s', 'Q2s', 'J6s', 'J5s', 'T6s', '96s', '75s', 'K7o', 'K6o', 'K5o', 'Q8o', 'J9o', 'J8o', 'T9o', 'T8o', '98o']);
PUSH_10BB.BB = PUSH_10BB.SB;

const PUSH_12BB = {
    UTG: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'KQs', 'KJs', 'AKo', 'AQo', 'AJo']),
    HJ: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'KQs', 'KJs', 'KTs', 'K9s', 'QJs', 'QTs', 'JTs', 'T9s', 'AKo', 'AQo', 'AJo', 'ATo', 'KQo', 'KJo']),
    CO: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'QJs', 'QTs', 'Q9s', 'JTs', 'J9s', 'T9s', '98s', '87s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'KQo', 'KJo', 'KTo', 'QJo']),
};
PUSH_12BB.BTN = new Set([...PUSH_12BB.CO, 'K7s', 'K6s', 'K5s', 'K4s', 'Q8s', 'Q7s', 'J8s', 'T8s', '97s', '86s', '76s', '65s', 'A7o', 'A6o', 'A5o', 'A4o', 'K9o', 'K8o', 'Q9o', 'JTo', 'J9o', 'T9o']);
PUSH_12BB.SB = new Set([...PUSH_12BB.BTN, 'K3s', 'K2s', 'Q6s', 'Q5s', 'J7s', 'T7s', '96s', '85s', '75s', 'A3o', 'A2o', 'K7o', 'K6o', 'Q8o', 'J8o', 'T8o', '98o', '87o']);
PUSH_12BB.BB = PUSH_12BB.SB;

const PUSH_15BB = {
    UTG: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', 'AKs', 'AQs', 'AJs', 'KQs', 'AKo', 'AQo']),
    HJ: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A5s', 'KQs', 'KJs', 'KTs', 'QJs', 'JTs', 'AKo', 'AQo', 'AJo', 'ATo', 'KQo']),
    CO: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs', 'KJs', 'KTs', 'K9s', 'QJs', 'QTs', 'Q9s', 'JTs', 'T9s', '98s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'KQo', 'KJo', 'QJo']),
};
PUSH_15BB.BTN = new Set([...PUSH_15BB.CO, '22', 'K8s', 'K7s', 'K6s', 'K5s', 'Q8s', 'Q7s', 'J9s', 'J8s', 'T8s', 'T7s', '87s', '76s', '65s', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'K9o', 'K8o', 'QTo', 'Q9o', 'JTo', 'J9o', 'T9o']);
PUSH_15BB.SB = new Set([...PUSH_15BB.BTN, 'K4s', 'K3s', 'K2s', 'Q6s', 'J7s', '97s', '86s', '75s', 'A3o', 'A2o', 'K7o', 'K6o', 'Q8o', 'J8o', 'T8o', '98o']);
PUSH_15BB.BB = PUSH_15BB.SB;

const PUSH_RANGES_BY_STACK = { '6': PUSH_6BB, '8': PUSH_8BB, '10': PUSH_10BB, '12': PUSH_12BB, '15': PUSH_15BB };

// ============================================================
// DEFEND SCENARIOS
// ============================================================
const DEFEND_SCENARIOS = {
    BTN_VS_CO: {
        hero: 'BTN', villain: 'CO',
        THREE_BET: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', 'AKs', 'AQs', 'AJs', 'KQs', 'AKo', 'AQo']),
        CALL: new Set(['99', '88', '77', '66', '55', '44', '33', '22', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KJs', 'KTs', 'K9s', 'QJs', 'QTs', 'Q9s', 'JTs', 'J9s', 'T9s', '98s', '87s', '76s', 'AJo', 'ATo', 'KQo', 'KJo', 'QJo'])
    },
    BTN_VS_HJ: {
        hero: 'BTN', villain: 'HJ',
        THREE_BET: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', 'AKs', 'AQs', 'AJs', 'KQs', 'AKo', 'AQo']),
        CALL: new Set(['99', '88', '77', '66', '55', '44', '33', '22', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'KJs', 'KTs', 'K9s', 'QJs', 'QTs', 'Q9s', 'JTs', 'J9s', 'T9s', '98s', '87s', '76s', 'AJo', 'ATo', 'KQo', 'KJo'])
    },
    BB_VS_BTN: {
        hero: 'BB', villain: 'BTN',
        THREE_BET: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', 'AKs', 'AQs', 'AJs', 'KQs', 'A5s', 'A4s', 'AKo', 'AQo']),
        CALL: new Set(['99', '88', '77', '66', '55', '44', '33', '22', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A3s', 'A2s', 'KJs', 'KTs', 'K9s', 'K8s', 'QJs', 'QTs', 'Q9s', 'Q8s', 'JTs', 'J9s', 'J8s', 'T9s', 'T8s', '98s', '87s', '76s', '65s', 'AJo', 'ATo', 'A9o', 'KQo', 'KJo', 'KTo', 'QJo', 'QTo', 'JTo', 'T9o'])
    },
    BB_VS_SB: {
        hero: 'BB', villain: 'SB',
        THREE_BET: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', 'AKs', 'AQs', 'AJs', 'KQs', 'A5s', 'A4s', 'A3s', 'AKo', 'AQo', 'AJo']),
        CALL: new Set(['99', '88', '77', '66', '55', '44', '33', '22', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A2s', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'QJs', 'QTs', 'Q9s', 'Q8s', 'JTs', 'J9s', 'J8s', 'T9s', 'T8s', '98s', '97s', '87s', '86s', '76s', '65s', '54s', 'ATo', 'A9o', 'KQo', 'KJo', 'KTo', 'K9o', 'QJo', 'QTo', 'Q9o', 'JTo', 'J9o', 'T9o', '98o'])
    },
    SB_VS_BTN: {
        hero: 'SB', villain: 'BTN',
        THREE_BET: new Set(['AA', 'KK', 'QQ', 'JJ', 'TT', '99', 'AKs', 'AQs', 'AJs', 'ATs', 'KQs', 'KJs', 'A5s', 'A4s', 'A3s', 'A2s', 'AKo', 'AQo', 'AJo']),
        CALL: new Set() // SB folds or 3-bets — minimal calling
    }
};

// ============================================================
// ALL 169 COMBOS (for weighted sampling)
// ============================================================
function buildAllCombos() {
    const combos = [];
    for (let i = 0; i < CHART_RANKS.length; i++) {
        for (let j = 0; j < CHART_RANKS.length; j++) {
            const r1 = CHART_RANKS[i], r2 = CHART_RANKS[j];
            if (i === j) {
                combos.push({ name: r1 + r2, baseWeight: 6 }); // pair: 6 combos
            } else if (j > i) {
                combos.push({ name: r1 + r2 + 's', baseWeight: 4 }); // suited: 4
            } else {
                combos.push({ name: r2 + r1 + 'o', baseWeight: 12 }); // offsuit: 12
            }
        }
    }
    return combos;
}
const ALL_COMBOS = buildAllCombos();

// ============================================================
// STATE
// ============================================================
let state = {
    score: 0,
    streak: 0,
    currentMode: 'RFI',
    currentHand: null,
    currentPosition: null,
    correctAction: null,
    explanation: '',
    lang: detectPreferredLanguage(),
    currentStack: '10',
    currentDefendScenario: 'BTN_VS_CO',
    currentCustomDrillId: null,
    currentCustomPracticeType: 'range',
    currentCustomDrillContext: null,
    currentAllStreetScenarioId: null,
    currentAllStreetScenarioIndex: -1,
    currentReviewItem: null,
    activeTab: 'practice',
    firstRunCompleted: false,
    firstRunStage: 'preferences',
    focusSession: null,
    trainingSession: null,
    diagnosticSession: null,
    handHistory: [],
    mistakeReplay: {
        queue: [],
        completed: []
    },
    comboWeights: {},
    gamification: {
        hidden: false,
        xp: 0,
        mastery: {},
        achievements: [],
        weeklyActivity: {},
        dailyActivity: {},
        streakForgives: 1
    },
    monetization: {
        donationIntent: false,
        lifetimeAdFree: false,
        adImpressions: 0,
        adImpressionsByDate: {},
        answeredHandsSinceAd: 0,
        completedSessionsSinceAd: 0,
        lastAdDate: null,
        dismissedAdDate: null,
        lastDismissedAdAt: null
    },
    chartPosition: 'UTG',
    rangeEditorData: {},    // cellName -> 'raise'|'call'|'fold'
    customRanges: {},       // name -> { raise: [...], call: [...] }
    customDrills: {},       // id -> versioned drill definition
    allStreetDrills: {},    // id -> future flop/turn/river drill definition
    assessment: null,
    assessmentSkipped: false,
    stats: {
        totalHands: 0,
        totalCorrect: 0,
        byPosition: {},
        byMode: {},
        byStackDepth: {},
        bySpotType: {}
    }
};

// ============================================================
// LOCAL STORAGE
// ============================================================
function getDefaultStats() {
    return { totalHands: 0, totalCorrect: 0, byPosition: {}, byMode: {}, byCustomDrill: {}, byStackDepth: {}, bySpotType: {} };
}

function getDefaultGamification(source = {}) {
    return {
        hidden: !!source.hidden,
        xp: source.xp || 0,
        mastery: source.mastery || {},
        achievements: Array.isArray(source.achievements) ? source.achievements : [],
        weeklyActivity: source.weeklyActivity || {},
        dailyActivity: source.dailyActivity || {},
        streakForgives: Number.isFinite(source.streakForgives) ? source.streakForgives : 1
    };
}

function getDefaultMonetization(source = {}) {
    return {
        donationIntent: !!source.donationIntent,
        lifetimeAdFree: !!source.lifetimeAdFree,
        adImpressions: source.adImpressions || 0,
        adImpressionsByDate: source.adImpressionsByDate && typeof source.adImpressionsByDate === 'object' && !Array.isArray(source.adImpressionsByDate)
            ? source.adImpressionsByDate
            : {},
        answeredHandsSinceAd: source.answeredHandsSinceAd || 0,
        completedSessionsSinceAd: source.completedSessionsSinceAd || 0,
        lastAdDate: source.lastAdDate || null,
        dismissedAdDate: source.dismissedAdDate || null,
        lastDismissedAdAt: source.lastDismissedAdAt || null
    };
}

function getDefaultMistakeReplay(source = {}) {
    return {
        queue: Array.isArray(source.queue) ? source.queue.slice(-MISTAKE_REPLAY_LIMIT) : [],
        completed: Array.isArray(source.completed) ? source.completed.slice(-MISTAKE_REPLAY_LIMIT) : []
    };
}

function normalizeStoragePayload(saved) {
    const source = saved && typeof saved === 'object' ? saved : {};
    return {
        version: STORAGE_VERSION,
        stats: { ...getDefaultStats(), ...(source.stats || {}), byCustomDrill: (source.stats && source.stats.byCustomDrill) || {} },
        comboWeights: source.comboWeights || {},
        handHistory: Array.isArray(source.handHistory) ? source.handHistory : [],
        mistakeReplay: getDefaultMistakeReplay(source.mistakeReplay || {}),
        focusSession: source.focusSession || null,
        trainingSession: source.trainingSession || null,
        customRanges: source.customRanges || {},
        customDrills: source.customDrills || {},
        allStreetDrills: source.allStreetDrills || {},
        assessment: source.assessment || null,
        assessmentSkipped: !!source.assessmentSkipped,
        lang: normalizeLanguage(source.lang) || detectPreferredLanguage(),
        activeTab: source.activeTab || 'practice',
        firstRunCompleted: !!source.firstRunCompleted,
        firstRunStage: source.firstRunStage || 'preferences',
        gamification: getDefaultGamification(source.gamification || {}),
        monetization: getDefaultMonetization(source.monetization || {})
    };
}

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return;
        const saved = normalizeStoragePayload(JSON.parse(raw));
        state.stats = saved.stats;
        state.comboWeights = saved.comboWeights;
        state.handHistory = saved.handHistory;
        state.mistakeReplay = saved.mistakeReplay;
        state.focusSession = saved.focusSession;
        state.trainingSession = saved.trainingSession;
        state.customRanges = saved.customRanges;
        state.customDrills = saved.customDrills;
        state.allStreetDrills = saved.allStreetDrills;
        state.assessment = saved.assessment;
        state.assessmentSkipped = saved.assessmentSkipped;
        state.lang = saved.lang;
        state.activeTab = saved.activeTab;
        state.firstRunCompleted = saved.firstRunCompleted;
        state.firstRunStage = saved.firstRunStage;
        state.gamification = saved.gamification;
        state.monetization = saved.monetization;
        refreshRangeDropdown();
    } catch (e) {
        console.warn('Could not load storage', e);
        state.customRanges = {};
        state.customDrills = {};
        state.allStreetDrills = {};
    }
}

function saveToStorage() {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify({
            version: STORAGE_VERSION,
            stats: state.stats,
            comboWeights: state.comboWeights,
            handHistory: state.handHistory.slice(-20),
            mistakeReplay: getDefaultMistakeReplay(state.mistakeReplay || {}),
            focusSession: state.focusSession,
            trainingSession: state.trainingSession,
            customRanges: state.customRanges,
            customDrills: state.customDrills,
            allStreetDrills: state.allStreetDrills,
            assessment: state.assessment,
            assessmentSkipped: state.assessmentSkipped,
            lang: state.lang,
            activeTab: state.activeTab,
            firstRunCompleted: state.firstRunCompleted,
            firstRunStage: state.firstRunStage,
            gamification: state.gamification,
            monetization: state.monetization
        }));
    } catch (e) { console.warn('Could not save storage', e); }
}

// Storage v3 migrates the existing pokerTrainer_v1 value in place:
// absent version/customDrills/allStreetDrills fields are defaulted without changing saved ranges.

function generateStableId(prefix) {
    const randomPart = Math.random().toString(36).slice(2, 8);
    return `${prefix}_${Date.now().toString(36)}_${randomPart}`;
}

function isValidPosition(pos) {
    return POSITIONS.includes(pos);
}

function isDrillRandomValue(value) {
    return String(value || '').toUpperCase() === DRILL_RANDOM_VALUE;
}

function isValidPositionOrRandom(pos) {
    return isDrillRandomValue(pos) || isValidPosition(pos);
}

function isValidPositiveNumberOrRandom(value) {
    return isDrillRandomValue(value) || Number(value) > 0;
}

function randomFrom(items, fallback = null) {
    const choices = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!choices.length) return fallback;
    return choices[Math.floor(Math.random() * choices.length)];
}

function resolveDrillPosition(value, options, fallback = 'BTN', avoid = null) {
    const choices = (Array.isArray(options) && options.length ? options : POSITIONS)
        .filter(pos => !avoid || pos !== avoid);
    if (isDrillRandomValue(value)) return randomFrom(choices, fallback);
    return isValidPosition(value) ? value : randomFrom(choices, fallback);
}

function resolveDrillOpenSize(value) {
    if (isDrillRandomValue(value)) return randomFrom(DRILL_OPEN_SIZE_OPTIONS, 2.5);
    const numeric = Number(value);
    return numeric > 0 ? numeric : 2.5;
}

function buildCustomDrillTurnContext(drill, excludedCards = []) {
    if (!drill) return null;
    const context = { drillId: drill.id };
    if (drill.type === DRILL_TYPES.FACING_3BET) {
        context.heroPosition = resolveDrillPosition(drill.heroPosition, DRILL_RFI_POSITIONS, 'CO');
        context.villainPosition = resolveDrillPosition(drill.villainPosition, DRILL_3BETTER_POSITIONS, 'BTN', context.heroPosition);
        context.openSizeBb = resolveDrillOpenSize(drill.openSizeBb);
        context.threeBetSizeBb = Number(drill.threeBetSizeBb) > 0 ? Number(drill.threeBetSizeBb) : 9;
    } else if (drill.type === DRILL_TYPES.DEFENSE_VS_OPEN) {
        context.heroPosition = resolveDrillPosition(drill.heroPosition, POSITIONS, 'BTN');
        context.openerPosition = resolveDrillPosition(drill.openerPosition, DRILL_RFI_POSITIONS, 'CO', context.heroPosition);
        context.openSizeBb = resolveDrillOpenSize(drill.openSizeBb);
    } else if (drill.type === DRILL_TYPES.RFI_FOCUS || drill.type === DRILL_TYPES.PUSH_FOLD) {
        const positions = Array.isArray(drill.heroPositions) && drill.heroPositions.length ? drill.heroPositions : ['BTN'];
        context.heroPosition = resolveDrillPosition(randomFrom(positions, 'BTN'), DRILL_RFI_POSITIONS, 'BTN');
        context.openSizeBb = resolveDrillOpenSize(drill.openSizeBb);
    } else if (drill.type === DRILL_TYPES.ALL_STREET) {
        context.allStreetScenario = buildCustomAllStreetScenario(drill, excludedCards);
        context.heroPosition = context.allStreetScenario.heroPosition;
    }
    return context;
}

function resolveAllStreetStreet(value) {
    if (isDrillRandomValue(value)) return randomFrom(ALL_STREET_STREETS, 'FLOP');
    return ALL_STREET_STREETS.includes(value) ? value : 'FLOP';
}

function resolveAllStreetTemplate(value, street) {
    const options = ALL_STREET_TEMPLATE_BY_STREET[street] || ALL_STREET_TEMPLATE_OPTIONS;
    if (isDrillRandomValue(value) || !options.includes(value)) return randomFrom(options, options[0]);
    return value;
}

function normalizeAllStreetPresetKey(value, aliases = {}) {
    const key = String(value || '').toUpperCase();
    return aliases[key] || key;
}

function hasAllStreetPreset(value, presets, aliases = {}) {
    if (isDrillRandomValue(value)) return true;
    const key = normalizeAllStreetPresetKey(value, aliases);
    return Object.prototype.hasOwnProperty.call(presets, key);
}

function resolveAllStreetPreset(value, presets, fallback, aliases = {}) {
    if (isDrillRandomValue(value)) return randomFrom(Object.keys(presets), fallback);
    const key = normalizeAllStreetPresetKey(value, aliases);
    return Object.prototype.hasOwnProperty.call(presets, key) ? key : fallback;
}

function normalizeCardCode(card) {
    if (!card) return '';
    if (typeof card === 'string') {
        const raw = card.trim();
        if (/\s/.test(raw) && !isValidCardCode(raw)) return '';
        return isValidCardCode(raw) ? `${raw[0].toUpperCase()}${raw[1].toLowerCase()}` : '';
    }
    if (typeof card === 'object') {
        const rank = String(card.rank || '').toUpperCase();
        const suit = CARD_SUIT_CODE_BY_NAME[String(card.suit || '').toLowerCase()] || '';
        const code = `${rank}${suit}`;
        return isValidCardCode(code) ? code : '';
    }
    return '';
}

function normalizeExcludedCardCodes(excludedCards = []) {
    const values = Array.isArray(excludedCards) ? excludedCards : [excludedCards];
    const cards = [];
    for (const item of values) {
        if (!item) continue;
        if (typeof item === 'string' && /\s/.test(item.trim()) && !isValidCardCode(item)) {
            cards.push(...parseBoardCardCodes(item));
            continue;
        }
        if (typeof item === 'object' && (item.c1 || item.c2)) {
            cards.push(item.c1, item.c2);
            continue;
        }
        cards.push(item);
    }
    return new Set(cards.map(normalizeCardCode).filter(Boolean));
}

function getHandCardCodes(hand) {
    return hand ? [normalizeCardCode(hand.c1), normalizeCardCode(hand.c2)].filter(Boolean) : [];
}

function getDeckCardCodes(excludedCards = []) {
    const excluded = normalizeExcludedCardCodes(excludedCards);
    const deck = [];
    for (const rank of RANKS) {
        for (const suit of CARD_SUIT_CODES) {
            const code = `${rank}${suit}`;
            if (!excluded.has(code)) deck.push(code);
        }
    }
    return deck;
}

function drawRandomBoardCards(street, excludedCards = []) {
    const count = getStreetBoardCount(street);
    const deck = getDeckCardCodes(excludedCards);
    const board = [];
    for (let i = 0; i < count && deck.length; i++) {
        const index = Math.floor(Math.random() * deck.length);
        board.push(deck.splice(index, 1)[0]);
    }
    return board;
}

function getBoardTextureMetrics(boardCards) {
    const cards = parseBoardCardCodes(boardCards).map(normalizeCardCode).filter(Boolean);
    const rankCounts = {};
    const suitCounts = {};
    const rankValues = [];
    for (const card of cards) {
        const rank = card[0].toUpperCase();
        const suit = card[1].toLowerCase();
        rankCounts[rank] = (rankCounts[rank] || 0) + 1;
        suitCounts[suit] = (suitCounts[suit] || 0) + 1;
        rankValues.push(BOARD_RANK_VALUES[rank]);
    }
    const uniqueRanks = Array.from(new Set(rankValues)).filter(Boolean).sort((a, b) => a - b);
    const wheelRanks = uniqueRanks.includes(14)
        ? Array.from(new Set([1, ...uniqueRanks])).sort((a, b) => a - b)
        : uniqueRanks;
    let straightWindow = 0;
    for (let start = 1; start <= 10; start++) {
        let count = 0;
        for (let value = start; value < start + 5; value++) {
            if (wheelRanks.includes(value)) count++;
        }
        straightWindow = Math.max(straightWindow, count);
    }
    let connectedRun = 0;
    let currentRun = 0;
    let previous = null;
    for (const value of wheelRanks) {
        currentRun = previous !== null && value === previous + 1 ? currentRun + 1 : 1;
        connectedRun = Math.max(connectedRun, currentRun);
        previous = value;
    }
    return {
        cards,
        rankCounts,
        suitCounts,
        isPaired: Object.values(rankCounts).some(count => count > 1),
        maxSuitCount: Math.max(0, ...Object.values(suitCounts)),
        straightWindow,
        connectedRun,
        broadwayCount: rankValues.filter(value => value >= 10).length
    };
}

function classifyBoardTexturePreset(boardCards) {
    const metrics = getBoardTextureMetrics(boardCards);
    if (metrics.cards.length < 3) return 'NEUTRAL';
    if (metrics.isPaired) return 'PAIRED';

    let score = 0;
    if (metrics.maxSuitCount >= 3) score += 4;
    else if (metrics.maxSuitCount === 2) score += 1;

    if (metrics.straightWindow >= 4) score += 4;
    else if (metrics.straightWindow === 3) score += 2;

    if (metrics.connectedRun >= 3) score += 3;
    else if (metrics.connectedRun === 2) score += 1;

    if (metrics.broadwayCount >= 3) score += 1;

    if (score <= 1) return 'DRY';
    if (score >= 5) return 'WET';
    return 'NEUTRAL';
}

function getGeneratedBoardTextureTags(boardCards) {
    const metrics = getBoardTextureMetrics(boardCards);
    const classification = classifyBoardTexturePreset(boardCards);
    const tags = [];
    if (classification === 'PAIRED') tags.push('paired');
    if (classification === 'DRY') tags.push('dry');
    if (classification === 'WET') tags.push('wet');
    if (classification === 'NEUTRAL') tags.push('medium-card');
    if (metrics.cards.length === 3 && metrics.maxSuitCount === 1) tags.push('rainbow');
    if (metrics.maxSuitCount === 2) tags.push('two-tone');
    if (metrics.straightWindow >= 3 || metrics.connectedRun >= 3) tags.push('connected');
    else tags.push('disconnected');
    if (metrics.broadwayCount >= 3) tags.push('broadway-heavy');
    if (classification === 'NEUTRAL' && !tags.includes('semi-connected')) tags.push('semi-connected');
    if (classification === 'WET' && metrics.cards.length >= 4) tags.push('draw-completer');
    return Array.from(new Set(tags));
}

function generateBoardByTexturePreset(preset, street, excludedCards = []) {
    const normalizedPreset = resolveAllStreetPreset(preset, ALL_STREET_BOARD_PRESETS, 'NEUTRAL', ALL_STREET_BOARD_PRESET_ALIASES);
    const normalizedStreet = resolveAllStreetStreet(street);
    const target = normalizedPreset === 'ALL' ? randomFrom(Object.keys(ALL_STREET_BOARD_PRESETS), 'NEUTRAL') : normalizedPreset;
    let fallbackBoard = null;
    for (let attempt = 0; attempt < 3000; attempt++) {
        const boardCards = drawRandomBoardCards(normalizedStreet, excludedCards);
        fallbackBoard = boardCards;
        if (classifyBoardTexturePreset(boardCards) === target) {
            return {
                boardCards,
                boardTexture: getGeneratedBoardTextureTags(boardCards)
            };
        }
    }
    const fallbackTexture = ALL_STREET_BOARD_PRESETS[target] || ALL_STREET_BOARD_PRESETS.NEUTRAL;
    return {
        boardCards: fallbackBoard || drawRandomBoardCards(normalizedStreet, excludedCards),
        boardTexture: fallbackTexture.boardTexture || ['medium-card']
    };
}

function getAllStreetRaiseSizeLabel(key) {
    const preset = ALL_STREET_RAISE_SIZE_PRESETS[key] || ALL_STREET_RAISE_SIZE_PRESETS.BET_33;
    return preset.label;
}

function getAllStreetTemplateActionLabels(template, raiseSizing) {
    const facingBet = ['CHECK_RAISE_FLOP', 'BLUFF_CATCH_RIVER', 'FACING_OVERBET'].includes(template);
    return {
        Fold: facingBet ? 'Fold' : 'Check',
        Call: 'Call',
        Raise: getAllStreetRaiseSizeLabel(raiseSizing)
    };
}

function getAllStreetAvailableActions(template) {
    if (['BLUFF_CATCH_RIVER', 'FACING_OVERBET'].includes(template)) return ['Fold', 'Call'];
    return ['Fold', 'Call', 'Raise'];
}

function getAllStreetAvailableSizes(actionLabels, raiseSizing) {
    const raisePreset = ALL_STREET_RAISE_SIZE_PRESETS[raiseSizing] || ALL_STREET_RAISE_SIZE_PRESETS.BET_33;
    return [actionLabels.Fold, actionLabels.Call, raisePreset.label].filter(Boolean);
}

function getAllStreetGeneratedComboActions(handQuality, availableActions) {
    const presetKey = resolveAllStreetPreset(handQuality, ALL_STREET_HAND_QUALITY_PRESETS, 'NORMAL');
    const preset = ALL_STREET_HAND_QUALITY_PRESETS[presetKey] || ALL_STREET_HAND_QUALITY_PRESETS.NORMAL;
    if (!availableActions.includes('Raise')) {
        return {
            Call: [...(preset.raise || []), ...(preset.call || [])],
            Fold: preset.fold || []
        };
    }
    return {
        Raise: preset.raise || [],
        Call: preset.call || [],
        Fold: preset.fold || []
    };
}

function getCurrentCustomDrillContext(drill) {
    const context = state.currentCustomDrillContext;
    if (context && drill && context.drillId === drill.id) return context;
    return buildCustomDrillTurnContext(drill);
}

function buildCustomAllStreetScenario(drill, excludedCards = []) {
    const street = resolveAllStreetStreet(drill.street || 'FLOP');
    const template = resolveAllStreetTemplate(drill.template || 'CBET_FLOP', street);
    const heroPosition = resolveDrillPosition(drill.heroPosition, POSITIONS, 'BTN');
    const villainPosition = resolveDrillPosition(drill.villainPosition, POSITIONS, 'BB', heroPosition);
    const boardPresetKey = resolveAllStreetPreset(drill.boardPreset, ALL_STREET_BOARD_PRESETS, 'NEUTRAL', ALL_STREET_BOARD_PRESET_ALIASES);
    const potPresetKey = resolveAllStreetPreset(drill.potPreset, ALL_STREET_POT_PRESETS, 'SMALL');
    const potPreset = ALL_STREET_POT_PRESETS[potPresetKey] || ALL_STREET_POT_PRESETS.SMALL;
    const raiseSizing = ALL_STREET_RAISE_SIZE_PRESETS[drill.raiseSizing] ? drill.raiseSizing : 'BET_33';
    const actionLabels = getAllStreetTemplateActionLabels(template, raiseSizing);
    const allowedActions = getAllStreetAvailableActions(template);
    const potBb = Number(drill.potBb) > 0 ? Number(drill.potBb) : potPreset.potBb;
    const effectiveStackBb = Number(drill.effectiveStackBb) > 0 ? Number(drill.effectiveStackBb) : 100;
    const spr = Number.isFinite(Number(drill.spr)) && Number(drill.spr) > 0
        ? Number(drill.spr)
        : Number((effectiveStackBb / potBb).toFixed(2));
    const legacyBoardCards = Array.isArray(drill.boardCards) ? drill.boardCards : parseBoardCardCodes(drill.boardCards);
    const generatedBoard = generateBoardByTexturePreset(boardPresetKey, street, excludedCards);
    const boardCards = legacyBoardCards.length === getStreetBoardCount(street)
        ? legacyBoardCards
        : generatedBoard.boardCards;
    const legacyTexture = Array.isArray(drill.boardTexture) ? drill.boardTexture : parseListInput(drill.boardTexture);
    const boardTexture = legacyTexture.length
        ? legacyTexture
        : legacyBoardCards.length
            ? getGeneratedBoardTextureTags(boardCards)
            : generatedBoard.boardTexture;
    const previousAction = Array.isArray(drill.previousAction) && drill.previousAction.length
        ? drill.previousAction
        : potPreset.previousAction;
    const availableSizes = Array.isArray(drill.availableSizes) && drill.availableSizes.length
        ? drill.availableSizes
        : getAllStreetAvailableSizes(actionLabels, raiseSizing);
    const comboActions = drill.ranges && (drill.ranges.raise || drill.ranges.call)
        ? {}
        : getAllStreetGeneratedComboActions(drill.handQuality, allowedActions);
    return {
        id: drill.id,
        version: drill.version || 1,
        packId: 'custom-allstreet',
        name: drill.name || 'Custom All-Street Drill',
        template,
        street,
        boardCards,
        boardTexture,
        heroPosition,
        villainPosition,
        potBb,
        effectiveStackBb,
        spr,
        previousAction,
        availableSizes,
        availableActions: allowedActions,
        actionLabels,
        defaultAction: drill.defaultAction || 'Fold',
        comboActions,
        ranges: drill.ranges || {},
        explanation: drill.note || 'Custom all-street training spot.'
    };
}

function getAllStreetScenarioById(id) {
    return ALL_STREET_SCENARIOS.find(scenario => scenario.id === id) || null;
}

function getCurrentAllStreetScenario() {
    return getAllStreetScenarioById(state.currentAllStreetScenarioId) || ALL_STREET_SCENARIOS[0];
}

function selectNextAllStreetScenario() {
    const currentIndex = Number.isFinite(Number(state.currentAllStreetScenarioIndex))
        ? Number(state.currentAllStreetScenarioIndex)
        : -1;
    state.currentAllStreetScenarioIndex = (currentIndex + 1) % ALL_STREET_PRACTICE_ORDER.length;
    const scenario = getAllStreetScenarioById(ALL_STREET_PRACTICE_ORDER[state.currentAllStreetScenarioIndex])
        || ALL_STREET_SCENARIOS[0];
    state.currentAllStreetScenarioId = scenario.id;
    return scenario;
}

function getCoreActionLabel(action, t = I18N[state.lang] || I18N.en) {
    const labels = {
        Fold: t.btnFold || 'Fold',
        Call: t.btnCall || 'Call',
        Raise: t.btnRaise || 'Raise',
        'All-In': t.btnAllIn || 'All-In'
    };
    return labels[action] || action;
}

function getAllStreetActionLabel(action, scenario = getCurrentAllStreetScenario()) {
    const t = I18N[state.lang] || I18N.en;
    if (scenario && scenario.actionLabels && scenario.actionLabels[action]) {
        const label = scenario.actionLabels[action];
        if (scenario.packId === ALL_STREET_PACKS.sourceReviewedCash100.id) {
            const key = POSTFLOP_SIZE_I18N_KEYS[label];
            return key && t[key] ? t[key] : label;
        }
        return label;
    }
    return getCoreActionLabel(action);
}

function getAllStreetStreetLabel(street, t = I18N[state.lang] || I18N.en) {
    const key = ALL_STREET_STREET_I18N_KEYS[street];
    return key && t[key] ? t[key] : street;
}

function getAllStreetTemplateLabel(template, t = I18N[state.lang] || I18N.en) {
    const key = ALL_STREET_TEMPLATE_I18N_KEYS[template];
    return key && t[key] ? t[key] : template;
}

function getLocalizedPostflopSizeLabel(label, t = I18N[state.lang] || I18N.en) {
    const key = POSTFLOP_SIZE_I18N_KEYS[label];
    return key && t[key] ? t[key] : label;
}

function getLocalizedPostflopSizeLabels(scenario, t = I18N[state.lang] || I18N.en) {
    return (scenario && Array.isArray(scenario.availableSizes) ? scenario.availableSizes : [])
        .map(size => getLocalizedPostflopSizeLabel(size, t));
}

function getLocalizedBoardTextureLabels(scenario, t = I18N[state.lang] || I18N.en) {
    return (scenario && Array.isArray(scenario.boardTexture) ? scenario.boardTexture : [])
        .map(tag => {
            const key = BOARD_TEXTURE_I18N_KEYS[tag];
            return key && t[key] ? t[key] : tag;
        });
}

function getAllStreetScenarioTitle(scenario, t = I18N[state.lang] || I18N.en) {
    if (!scenario) return '';
    const key = `allStreetScenarioTitle_${scenario.id}`;
    return t[key] || scenario.name || '';
}

function getAllStreetScenarioExplanation(scenario, t = I18N[state.lang] || I18N.en) {
    if (!scenario) return '';
    const key = `allStreetScenarioExplanation_${scenario.id}`;
    return t[key] || scenario.explanation || '';
}

function getFeedbackActionLabel(action) {
    if (state.currentMode === 'ALL_STREET') return getAllStreetActionLabel(action, getActiveAllStreetScenario());
    if (state.currentMode === 'CUSTOM') {
        const drill = getActiveCustomDrill();
        if (drill && drill.type === DRILL_TYPES.ALL_STREET) return getAllStreetActionLabel(action, getActiveAllStreetScenario());
    }
    if (state.currentMode === 'REVIEW' && state.currentReviewItem && state.currentReviewItem.sourceMode === 'ALL_STREET') {
        return getAllStreetActionLabel(action, getAllStreetScenarioById(state.currentReviewItem.allStreetScenarioId));
    }
    return getCoreActionLabel(action);
}

function parseListInput(value) {
    return String(value || '')
        .split(/[,\n/]+/)
        .map(item => item.trim())
        .filter(Boolean);
}

function parseBoardCardCodes(value) {
    if (Array.isArray(value)) return value.map(card => String(card).trim()).filter(Boolean);
    return String(value || '').split(/\s+/).map(card => card.trim()).filter(Boolean);
}

function getStreetBoardCount(street) {
    return street === 'RIVER' ? 5 : street === 'TURN' ? 4 : 3;
}

function isValidCardCode(code) {
    return /^[2-9TJQKA][shdc]$/i.test(String(code || '').trim());
}

function parseCardCode(code) {
    const raw = String(code || '').trim();
    const suitMap = { s: 'spades', h: 'hearts', d: 'diamonds', c: 'clubs' };
    return { rank: raw[0] || '', suit: suitMap[String(raw[1] || '').toLowerCase()] || 'spades' };
}

function renderBoardCards(cards) {
    if (!boardCardsEl) return;
    const board = Array.isArray(cards) ? cards : [];
    boardCardsEl.classList.toggle('hidden', board.length === 0);
    boardCardsEl.innerHTML = board.map(card => renderCard(parseCardCode(card))).join('');
}

function resetActionButtonLabels() {
    const t = I18N[state.lang] || I18N.en;
    if (btnFoldEl) btnFoldEl.innerText = t.btnFold || 'Fold';
    if (btnCallEl) btnCallEl.innerText = t.btnCall || 'Call';
    if (btnRaiseEl) btnRaiseEl.innerText = t.btnRaise || 'Raise';
    if (btnAllInEl) btnAllInEl.innerText = t.btnAllIn || 'All-In';
}

function getActiveAllStreetScenario() {
    const drill = state.currentMode === 'CUSTOM' ? getActiveCustomDrill() : null;
    if (drill && drill.type === DRILL_TYPES.ALL_STREET) {
        const context = getCurrentCustomDrillContext(drill);
        return context && context.allStreetScenario ? context.allStreetScenario : buildCustomAllStreetScenario(drill);
    }
    return getCurrentAllStreetScenario();
}

function updateKeyboardHintForActions(scenario = null) {
    const el = document.getElementById('kbd-hint');
    if (!el) return;
    const t = I18N[state.lang] || I18N.en;
    if (!scenario) {
        el.innerText = t.kbdHint || 'Shortcuts: C Check / Space Fold / M Call / Enter Raise';
        return;
    }
    const allowed = action => !scenario.availableActions || scenario.availableActions.includes(action);
    const checkLabel = t.postflopActionCheck || 'Check';
    const foldLabel = getAllStreetActionLabel('Fold', scenario);
    const labels = [];
    if (allowed('Fold') && foldLabel === checkLabel) labels.push(`C: ${foldLabel}`);
    if (allowed('Fold') && foldLabel !== checkLabel) labels.push(`Space: ${foldLabel}`);
    if (allowed('Call')) labels.push(`M: ${getAllStreetActionLabel('Call', scenario)}`);
    if (allowed('Raise')) labels.push(`Enter: ${getAllStreetActionLabel('Raise', scenario)}`);
    el.innerText = labels.join(' / ');
}

function renderPostflopControlPanel(scenario = null) {
    if (!postflopControlPanelEl) return;
    postflopControlPanelEl.classList.add('hidden');
    postflopControlPanelEl.innerHTML = '';
    updateKeyboardHintForActions(scenario);
}

function renderScenarioTags(tags = [], badge = '') {
    if (!scenarioTextEl) return;
    scenarioTextEl.classList.remove('scenario-allstreet-summary');
    const cleanTags = tags.filter(Boolean).map(tag => String(tag));
    scenarioTextEl.innerHTML = cleanTags.length
        ? cleanTags.map(tag => `<span class="scenario-tag">${escapeHtml(tag)}</span>`).join('')
        : escapeHtml((I18N[state.lang] || I18N.en).waitingHand || 'Waiting for next hand...');
    setScenarioBadge(badge === null ? '' : (badge || cleanTags[0] || ''));
}

function setScenarioBadge(badgeText = '') {
    if (heroPositionEl) {
        heroPositionEl.innerText = badgeText;
        heroPositionEl.classList.toggle('hidden', !badgeText);
        const panel = typeof heroPositionEl.closest === 'function' ? heroPositionEl.closest('.scenario-panel') : null;
        if (panel) panel.classList.toggle('has-position-badge', Boolean(badgeText));
    }
}

const ALL_STREET_SCENARIO_BODY_TEMPLATES = Object.freeze({
    en: '{heroLabel}: {hero}. {villainLabel}: {villain}. Pot {pot}bb, effective stack {stack}bb, SPR {spr}. Previous action: {line}.',
    'zh-TW': '{heroLabel} 是 {hero}，{villainLabel} 是 {villain}。目前底池 {pot}bb、有效籌碼 {stack}bb、SPR {spr}；前面行動：{line}。',
    'zh-CN': '{heroLabel} 是 {hero}，{villainLabel} 是 {villain}。目前底池 {pot}bb、有效筹码 {stack}bb、SPR {spr}；前面行动：{line}。',
    ja: '{heroLabel} は {hero}、{villainLabel} は {villain}。ポット {pot}bb、有効スタック {stack}bb、SPR {spr}。直前のアクション: {line}。',
    ko: '{heroLabel}: {hero}. {villainLabel}: {villain}. 팟 {pot}bb, 유효 스택 {stack}bb, SPR {spr}. 이전 액션: {line}.',
    es: '{heroLabel}: {hero}. {villainLabel}: {villain}. Bote {pot}bb, stack efectivo {stack}bb, SPR {spr}. Accion previa: {line}.'
});

function renderAllStreetScenarioSummary(scenario, t = I18N[state.lang] || I18N.en) {
    if (!scenarioTextEl || !scenario) return;
    scenarioTextEl.classList.add('scenario-allstreet-summary');
    const title = getAllStreetScenarioTitle(scenario, t);
    const roleTags = getHeadsUpPositionTags(scenario, t);
    const line = Array.isArray(scenario.previousAction) ? scenario.previousAction.join(' / ') : '';
    const bodyTemplate = t.allStreetScenarioBody
        || ALL_STREET_SCENARIO_BODY_TEMPLATES[state.lang]
        || ALL_STREET_SCENARIO_BODY_TEMPLATES.en
        || '{heroLabel}: {hero}. {villainLabel}: {villain}. Pot {pot}bb, stack {stack}bb, SPR {spr}. Line: {line}.';
    const body = bodyTemplate
        .replace('{heroLabel}', t.tableInfoHero || 'Hero')
        .replace('{villainLabel}', t.tableInfoVillain || 'Opponent')
        .replace('{hero}', scenario.heroPosition)
        .replace('{villain}', scenario.villainPosition)
        .replace('{pot}', scenario.potBb)
        .replace('{stack}', scenario.effectiveStackBb)
        .replace('{spr}', scenario.spr)
        .replace('{line}', line);
    scenarioTextEl.innerHTML = `
        <span class="scenario-tag-row">
            <span class="scenario-tag scenario-tag-primary">${escapeHtml(title)}</span>
            ${roleTags.map(tag => `<span class="scenario-tag">${escapeHtml(tag)}</span>`).join('')}
        </span>
        <span class="scenario-copy">${escapeHtml(body)}</span>
    `;
    setScenarioBadge('');
}

function renderTableContextOverlay(model = {}) {
    if (!tableContextOverlayEl) return;
    const positions = Array.isArray(model.positions) ? model.positions.filter(Boolean) : [];
    const metrics = Array.isArray(model.metrics) ? model.metrics.filter(Boolean) : [];
    const textures = Array.isArray(model.textures) ? model.textures.filter(Boolean) : [];
    const sizes = Array.isArray(model.sizes) ? model.sizes.filter(Boolean) : [];
    if (!positions.length && !metrics.length && !textures.length && !sizes.length) {
        tableContextOverlayEl.innerHTML = '';
        return;
    }
    const iconHtml = icon => icon ? `<span aria-hidden="true">${escapeHtml(icon)}</span>` : '';
    tableContextOverlayEl.innerHTML = `
        ${positions.length ? `
            <div class="table-seat-row">
                ${positions.map(item => `
                    <span class="table-seat-chip ${item.role ? `is-${escapeHtml(item.role)}` : ''}" title="${escapeHtml(item.label || '')}" aria-label="${escapeHtml(item.aria || item.label || '')}">
                        ${iconHtml(item.icon)}${escapeHtml(item.label || '')}
                    </span>
                `).join('')}
            </div>
        ` : ''}
        ${metrics.length ? `
            <div class="table-info-row">
                ${metrics.map(item => `
                    <span class="table-info-chip" title="${escapeHtml(item.label || '')}" aria-label="${escapeHtml(`${item.label || ''} ${item.value || ''}`.trim())}">
                        ${iconHtml(item.icon)}${escapeHtml(item.value || '')}
                    </span>
                `).join('')}
            </div>
        ` : ''}
        ${textures.length || sizes.length ? `
            <div class="table-info-row table-context-tags">
                ${textures.map(item => `
                    <span class="table-info-chip" title="${escapeHtml(item.label || item)}" aria-label="${escapeHtml(item.label || item)}">
                        ${iconHtml(item.icon)}${escapeHtml(item.value || item.label || item)}
                    </span>
                `).join('')}
                ${sizes.map(item => `
                    <span class="table-info-chip is-size" title="${escapeHtml(item.label || item)}" aria-label="${escapeHtml(item.label || item)}">
                        ${iconHtml(item.icon)}${escapeHtml(item.value || item.label || item)}
                    </span>
                `).join('')}
            </div>
        ` : ''}
    `;
}

function getAllStreetTableModel(scenario, t) {
    if (!scenario) return {};
    return {
        positions: [
            { role: 'hero', icon: '', label: getRolePositionLabel('hero', scenario.heroPosition, t), aria: getRolePositionLabel('hero', scenario.heroPosition, t) },
            { role: 'villain', icon: '', label: getRolePositionLabel('villain', scenario.villainPosition, t), aria: getRolePositionLabel('villain', scenario.villainPosition, t) }
        ]
    };
}

function getRolePositionLabel(role, position, t = I18N[state.lang] || I18N.en) {
    const label = role === 'villain' ? (t.tableInfoVillain || 'Opponent') : (t.tableInfoHero || 'Hero');
    return `${label}: ${position}`;
}

function getHeadsUpPositionTags(scenario, t = I18N[state.lang] || I18N.en) {
    if (!scenario) return [];
    return [
        getRolePositionLabel('hero', scenario.heroPosition, t),
        getRolePositionLabel('villain', scenario.villainPosition, t)
    ];
}

function getAllStreetScenarioMetaTag(scenario, t = I18N[state.lang] || I18N.en) {
    if (!scenario) return '';
    return [
        `${t.postflopPotLabel || 'Pot'} ${scenario.potBb}bb`,
        `${t.postflopStackLabel || 'Stack'} ${scenario.effectiveStackBb}bb`,
        `${t.tableInfoSpr || 'SPR'} ${scenario.spr}`
    ].join(' / ');
}

function getDefaultAllStreetCoachHtml() {
    return '<div class="coach-framework"><h3>Postflop Starter Pack</h3><p class="coach-summary">Train one flop, turn, and river decision using board texture, pot, SPR, and sizing context.</p><div class="coach-section"><p class="coach-section-title">Decision process</p><ol class="coach-process"><li>Read the board texture and action line before looking at the hand.</li><li>Use range advantage, nut advantage, blockers, and equity realization to choose the action.</li></ol></div><p class="coach-micro-goal"><strong>Practice target:</strong> Name the board texture and sizing reason before clicking.</p></div>';
}

function buildAllStreetCoachHtml(t = I18N[state.lang] || I18N.en) {
    return t.coachAllStreet || getDefaultAllStreetCoachHtml();
}

function updateAllStreetActionButtons(scenario = getActiveAllStreetScenario()) {
    const allowed = scenario && Array.isArray(scenario.availableActions) ? scenario.availableActions : ['Fold', 'Call', 'Raise'];
    if (btnFoldEl) {
        btnFoldEl.classList.toggle('hidden', !allowed.includes('Fold'));
        btnFoldEl.innerText = getAllStreetActionLabel('Fold', scenario);
    }
    if (btnCallEl) {
        btnCallEl.classList.toggle('hidden', !allowed.includes('Call'));
        btnCallEl.innerText = getAllStreetActionLabel('Call', scenario);
    }
    if (btnRaiseEl) {
        btnRaiseEl.classList.toggle('hidden', !allowed.includes('Raise'));
        btnRaiseEl.innerText = getAllStreetActionLabel('Raise', scenario);
    }
    if (btnAllInEl) {
        btnAllInEl.classList.toggle('hidden', !allowed.includes('All-In'));
        btnAllInEl.innerText = getAllStreetActionLabel('All-In', scenario);
    }
}

function isValidRangeCodeMaybe(code) {
    if (!code) return true;
    try {
        decodeRangeCodeToEditorState(code);
        return true;
    } catch (e) {
        return false;
    }
}

function getCustomDrillRequiredFields(type) {
    switch (type) {
        case DRILL_TYPES.RFI_FOCUS:
            return ['name', 'type', 'gameType', 'heroPositions'];
        case DRILL_TYPES.DEFENSE_VS_OPEN:
            return ['name', 'type', 'gameType', 'heroPosition', 'openerPosition', 'ranges'];
        case DRILL_TYPES.FACING_3BET:
            return ['name', 'type', 'gameType', 'heroPosition', 'villainPosition', 'effectiveStackBb', 'openSizeBb', 'threeBetSizeBb', 'ranges'];
        case DRILL_TYPES.PUSH_FOLD:
            return ['name', 'type', 'gameType', 'heroPositions', 'stackBb'];
        case DRILL_TYPES.ALL_STREET:
            return ['name', 'type', 'gameType', 'street', 'template', 'boardPreset', 'handQuality', 'potPreset', 'raiseSizing', 'heroPosition', 'villainPosition', 'effectiveStackBb', 'defaultAction'];
        default:
            return ['name', 'type', 'gameType'];
    }
}

function validateCustomDrill(drill) {
    const errors = [];
    if (!drill || typeof drill !== 'object') return { valid: false, errors: ['invalid'] };
    if (!Object.values(DRILL_TYPES).includes(drill.type)) errors.push('type');
    if (!Object.values(GAME_TYPES).includes(drill.gameType)) errors.push('gameType');
    if (!drill.name || typeof drill.name !== 'string') errors.push('name');

    for (const field of getCustomDrillRequiredFields(drill.type)) {
        if (drill[field] === undefined || drill[field] === null || drill[field] === '') errors.push(field);
    }

    if (drill.heroPosition && !isValidPositionOrRandom(drill.heroPosition)) errors.push('heroPosition');
    if (drill.openerPosition && !isValidPositionOrRandom(drill.openerPosition)) errors.push('openerPosition');
    if (drill.villainPosition && !isValidPositionOrRandom(drill.villainPosition)) errors.push('villainPosition');
    if (drill.heroPositions && (!Array.isArray(drill.heroPositions) || drill.heroPositions.some(pos => !isValidPosition(pos)))) {
        errors.push('heroPositions');
    }
    if (drill.effectiveStackBb !== undefined && Number(drill.effectiveStackBb) <= 0) errors.push('effectiveStackBb');
    if (drill.openSizeBb !== undefined && !isValidPositiveNumberOrRandom(drill.openSizeBb)) errors.push('openSizeBb');
    if (drill.threeBetSizeBb !== undefined && Number(drill.threeBetSizeBb) <= 0) errors.push('threeBetSizeBb');
    if (drill.stackBb !== undefined && Number(drill.stackBb) <= 0) errors.push('stackBb');
    if (drill.type === DRILL_TYPES.ALL_STREET) {
        if (!(isDrillRandomValue(drill.street) || ALL_STREET_STREETS.includes(drill.street))) errors.push('street');
        if (!(isDrillRandomValue(drill.template) || ALL_STREET_TEMPLATE_OPTIONS.includes(drill.template))) errors.push('template');
        if (!hasAllStreetPreset(drill.boardPreset, ALL_STREET_BOARD_PRESETS, ALL_STREET_BOARD_PRESET_ALIASES)) errors.push('boardPreset');
        if (!hasAllStreetPreset(drill.handQuality, ALL_STREET_HAND_QUALITY_PRESETS)) errors.push('handQuality');
        if (!hasAllStreetPreset(drill.potPreset, ALL_STREET_POT_PRESETS)) errors.push('potPreset');
        if (!ALL_STREET_RAISE_SIZE_PRESETS[drill.raiseSizing]) errors.push('raiseSizing');
        if (Number(drill.effectiveStackBb) <= 0) errors.push('effectiveStackBb');
        if (!['Fold', 'Call', 'Raise', 'All-In'].includes(drill.defaultAction)) errors.push('defaultAction');
    }

    if (drill.ranges && typeof drill.ranges === 'object') {
        if (drill.type === DRILL_TYPES.FACING_3BET && (!drill.ranges.raise || !drill.ranges.call)) {
            errors.push('ranges');
        }
        if (drill.type === DRILL_TYPES.DEFENSE_VS_OPEN && (!drill.ranges.raise || !drill.ranges.call)) {
            errors.push('ranges');
        }
        for (const code of Object.values(drill.ranges)) {
            if (!isValidRangeCodeMaybe(code)) errors.push('ranges');
        }
    } else if (getCustomDrillRequiredFields(drill.type).includes('ranges')) {
        errors.push('ranges');
    }

    return { valid: errors.length === 0, errors: [...new Set(errors)] };
}

function createCustomDrill(input) {
    const now = new Date().toISOString();
    return {
        ...input,
        version: 1,
        id: input.id || generateStableId('drill'),
        name: input.name || 'Untitled Drill',
        type: input.type || DRILL_TYPES.RFI_FOCUS,
        gameType: input.gameType || GAME_TYPES.CASH,
        createdAt: input.createdAt || now,
        updatedAt: now,
        enabled: input.enabled !== false
    };
}

function saveCustomDrill(input) {
    const drill = createCustomDrill(input);
    const result = validateCustomDrill(drill);
    if (!result.valid) return { ok: false, errors: result.errors, drill };
    state.customDrills[drill.id] = drill;
    saveToStorage();
    return { ok: true, drill };
}

function listCustomDrills() {
    return Object.values(state.customDrills).sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
}

function deleteCustomDrill(id) {
    if (!state.customDrills[id]) return false;
    delete state.customDrills[id];
    saveToStorage();
    return true;
}

function duplicateCustomDrill(id) {
    const source = state.customDrills[id];
    if (!source) return { ok: false, errors: ['notFound'] };
    const copy = createCustomDrill({
        ...source,
        id: generateStableId('drill'),
        name: `${source.name} Copy`,
        createdAt: undefined,
        updatedAt: undefined
    });
    state.customDrills[copy.id] = copy;
    saveToStorage();
    return { ok: true, drill: copy };
}

function canTrainCustomDrill(drill) {
    return validateCustomDrill(drill).valid && drill.enabled !== false;
}

function getUniqueDrillName(name) {
    const existing = new Set(Object.values(state.customDrills).map(drill => drill.name));
    if (!existing.has(name)) return name;
    let index = 2;
    let candidate = `${name} Copy`;
    while (existing.has(candidate)) {
        candidate = `${name} Copy ${index}`;
        index++;
    }
    return candidate;
}

function serializeDrillDefinition(drill) {
    return JSON.stringify({
        format: 'PTD1',
        drill: {
            ...drill,
            id: undefined,
            createdAt: undefined,
            updatedAt: undefined
        }
    });
}

function parseDrillDefinition(raw) {
    const parsed = JSON.parse(raw);
    const drill = parsed && parsed.format === 'PTD1' ? parsed.drill : parsed;
    if (!drill || typeof drill !== 'object') throw new Error('invalid');
    const imported = createCustomDrill({
        ...drill,
        id: undefined,
        name: getUniqueDrillName(drill.name || 'Imported Drill')
    });
    const validation = validateCustomDrill(imported);
    if (!validation.valid) {
        const error = new Error('invalid');
        error.errors = validation.errors;
        throw error;
    }
    return imported;
}

function createAssessmentProfile(input) {
    const now = new Date().toISOString();
    return {
        version: 2,
        status: input.status || 'in_progress',
        answers: input.answers || {},
        diagnostic: input.diagnostic || null,
        skillDimensions: input.skillDimensions || {},
        recommendedPlan: input.recommendedPlan || null,
        createdAt: input.createdAt || now,
        updatedAt: now
    };
}

function saveAssessmentProfile(input) {
    state.assessment = createAssessmentProfile({ ...(state.assessment || {}), ...input });
    state.assessmentSkipped = false;
    saveToStorage();
    return state.assessment;
}

function skipAssessment() {
    state.assessmentSkipped = true;
    if (!state.assessment) {
        state.assessment = createAssessmentProfile({ status: 'skipped' });
    } else {
        state.assessment = { ...state.assessment, status: 'skipped', updatedAt: new Date().toISOString() };
    }
    saveToStorage();
    return state.assessment;
}

function resetAssessment() {
    state.assessment = null;
    state.assessmentSkipped = false;
    saveToStorage();
}

function getAssessmentAnswersFromForm() {
    return {
        experience: document.getElementById('assessment-experience-select')?.value || 'beginner',
        gameType: document.getElementById('assessment-game-type-select')?.value || 'cash',
        stackFocus: document.getElementById('assessment-stack-focus-select')?.value || 'deep',
        confidence: document.getElementById('assessment-confidence-select')?.value || 'medium'
    };
}

function getAssessmentPlan(answers) {
    const t = I18N[state.lang] || I18N.en;
    const priorities = [];
    const leaks = [];

    if (answers.experience === 'beginner' || answers.confidence === 'low') {
        priorities.push('RFI', 'DEFEND');
        leaks.push(t.assessmentLeakRfi || 'Opening range discipline');
        leaks.push(t.assessmentLeakDefense || 'Facing opens');
    }
    if (answers.gameType === 'tournament' || answers.stackFocus === 'short') {
        priorities.push('PUSH_FOLD');
        leaks.push(t.assessmentLeakShortStack || 'Short-stack push/fold decisions');
    }
    if (answers.stackFocus === 'deep' || answers.experience === 'advanced') {
        priorities.push('FACING_3BET', 'DEFEND');
        leaks.push(t.assessmentLeakThreeBet || 'Facing 3-bets');
    }
    if (answers.gameType === 'cash' && answers.confidence !== 'low') {
        priorities.push('RFI', 'FACING_3BET');
    }

    const uniquePriorities = [...new Set(priorities)].slice(0, 3);
    const uniqueLeaks = [...new Set(leaks)].slice(0, 3);
    const dailyDrill = uniquePriorities[0] || 'RFI';

    return {
        version: 1,
        source: 'questionnaire',
        recommendedModes: uniquePriorities.length ? uniquePriorities : ['RFI', 'DEFEND', 'PUSH_FOLD'],
        topLeaks: uniqueLeaks.length ? uniqueLeaks : [t.assessmentLeakRfi || 'Opening range discipline'],
        dailyDrill,
        adaptivePriorities: uniquePriorities.length ? uniquePriorities : ['RFI'],
        generatedAt: new Date().toISOString()
    };
}

function renderAssessmentRecommendation(plan) {
    const el = document.getElementById('assessment-recommendation-preview');
    if (!el) return;
    const t = I18N[state.lang] || I18N.en;
    const currentPlan = plan || getAssessmentPlan(getAssessmentAnswersFromForm());
    el.innerHTML = `
        <h3>${t.assessmentRecommendationTitle || 'Initial recommendation'}</h3>
        <p>${(t.assessmentDailyDrill || 'Daily drill: {drill}').replace('{drill}', getModeLabel(currentPlan.dailyDrill, t))}</p>
        <div class="assessment-chip-row">
            ${currentPlan.recommendedModes.map(mode => `<span class="assessment-chip">${getModeLabel(mode, t)}</span>`).join('')}
        </div>
        <ul>${currentPlan.topLeaks.map(leak => `<li>${escapeHtml(leak)}</li>`).join('')}</ul>
    `;
}

function renderDiagnosticSummary() {
    const el = document.getElementById('diagnostic-summary-preview');
    if (!el) return;
    const t = I18N[state.lang] || I18N.en;
    const diagnostic = state.assessment && state.assessment.diagnostic;
    if (!diagnostic) {
        el.innerHTML = `<h3>${t.diagnosticTitle || 'Diagnostic'}</h3><p>${t.diagnosticEmpty || 'No diagnostic run yet.'}</p>`;
        return;
    }
    const accuracy = pct(diagnostic.correct || 0, diagnostic.total || 0);
    const avgSeconds = Math.round((diagnostic.averageResponseMs || 0) / 100) / 10;
    const profile = state.assessment && state.assessment.skillDimensions ? state.assessment.skillDimensions : {};
    const dimensions = profile.dimensions || {};
    const rows = Object.entries(dimensions).map(([mode, dim]) => `
        <tr>
            <td>${getModeLabel(mode, t)}</td>
            <td>${dim.hands}</td>
            <td>${dim.accuracy}%</td>
            <td>${Math.round((dim.averageResponseMs || 0) / 100) / 10}s</td>
        </tr>
    `).join('');
    const profileHtml = `
        <div class="assessment-profile-grid">
            <div><span>${t.skillBaseline || 'Baseline'}</span><strong>${escapeHtml(profile.baselineLevel || getBaselineLevel(accuracy, diagnostic.averageResponseMs || 0))}</strong></div>
            <div><span>${t.skillWeakest || 'Weakest'}</span><strong>${getModeLabel(profile.weakestDimension || 'RFI', t)}</strong></div>
            <div><span>${t.skillFastest || 'Avg Speed'}</span><strong>${avgSeconds}s</strong></div>
        </div>
        ${rows ? `<table class="stats-table assessment-dimensions"><thead><tr><th>${t.statsMode || 'Mode'}</th><th>${t.lifetimeHands || 'Hands'}</th><th>${t.statsAccuracy || 'Accuracy'}</th><th>${t.responseTime || 'Time'}</th></tr></thead><tbody>${rows}</tbody></table>` : ''}
    `;
    el.innerHTML = `
        <h3>${t.diagnosticTitle || 'Diagnostic'}</h3>
        <p>${(t.diagnosticSummary || '{hands} hands · {accuracy}% · {seconds}s avg')
            .replace('{hands}', diagnostic.total || 0)
            .replace('{accuracy}', accuracy)
            .replace('{seconds}', avgSeconds)}</p>
        ${profileHtml}
        <ul>${(diagnostic.repeatedMistakes || []).map(item => `<li>${escapeHtml(item.label)}: ${item.count}</li>`).join('')}</ul>
    `;
}

function populateAssessmentForm() {
    const answers = state.assessment && state.assessment.answers ? state.assessment.answers : {};
    ASSESSMENT_FIELDS.forEach(field => {
        const id = `assessment-${field.replace(/[A-Z]/g, ch => `-${ch.toLowerCase()}`)}-select`;
        const el = document.getElementById(id);
        if (el && answers[field]) el.value = answers[field];
    });
    renderAssessmentRecommendation(state.assessment && state.assessment.recommendedPlan);
    renderDiagnosticSummary();
}

window.openAssessmentModal = function () {
    const modal = document.getElementById('assessment-modal');
    if (!modal) return;
    populateAssessmentForm();
    modal.classList.remove('hidden');
};

window.closeAssessmentModal = function () {
    const modal = document.getElementById('assessment-modal');
    if (modal) modal.classList.add('hidden');
};

window.saveAssessmentFromForm = function (event) {
    if (event) event.preventDefault();
    const answers = getAssessmentAnswersFromForm();
    const recommendedPlan = getAssessmentPlan(answers);
    const profile = saveAssessmentProfile({
        status: 'completed',
        answers,
        recommendedPlan
    });
    renderAssessmentRecommendation(profile.recommendedPlan);
    renderPersonalizedDashboard();
    showToast((I18N[state.lang] || I18N.en).assessmentSaved || 'Assessment saved.', 'success');
};

window.skipAssessmentFromModal = function () {
    skipAssessment();
    renderAssessmentRecommendation(getAssessmentPlan(getAssessmentAnswersFromForm()));
    renderPersonalizedDashboard();
    showToast((I18N[state.lang] || I18N.en).assessmentSkipped || 'Assessment skipped.', 'info');
    closeAssessmentModal();
};

window.resetAssessmentFromModal = function () {
    resetAssessment();
    populateAssessmentForm();
    renderPersonalizedDashboard();
    showToast((I18N[state.lang] || I18N.en).assessmentResetDone || 'Assessment reset.', 'info');
};

window.startRecommendedTraining = function () {
    const t = I18N[state.lang] || I18N.en;
    const plan = state.assessment && state.assessment.recommendedPlan
        ? state.assessment.recommendedPlan
        : getAssessmentPlan({ experience: 'beginner', gameType: 'cash', stackFocus: 'deep', confidence: 'medium' });
    const target = plan && (plan.dailyDrill || (plan.recommendedModes && plan.recommendedModes[0]));
    if (!target) {
        showToast(t.assessmentNoRecommendation || 'Complete the assessment first.', 'info');
        return;
    }
    if (target === 'FACING_3BET') {
        const drill = listCustomDrills().find(item => item.type === DRILL_TYPES.FACING_3BET && canTrainCustomDrill(item));
        if (drill) {
            state.currentCustomPracticeType = 'drill';
            state.currentCustomDrillId = drill.id;
        } else {
            showToast(t.assessmentThreeBetFallback || 'Facing 3-Bet needs a custom drill. Starting Defense instead.', 'info');
            closeAssessmentModal();
            window.startFocusSession();
            return;
        }
    }
    closeAssessmentModal();
    window.startFocusSession();
};

function getDiagnosticSpot(index) {
    const spots = ['RFI', 'DEFEND', 'PUSH_FOLD', 'FACING_3BET'];
    return { type: spots[index % spots.length] };
}

function applyDiagnosticUi(spot) {
    const t = I18N[state.lang] || I18N.en;
    if (spot.type === 'PUSH_FOLD') {
        coachBadgeEl.innerText = t.badgePushFold;
        coachBadgeEl.style.background = '#e53e3e';
        btnCallEl.classList.add('hidden');
        btnRaiseEl.classList.add('hidden');
        btnAllInEl.classList.remove('hidden');
    } else if (spot.type === 'DEFEND' || spot.type === 'FACING_3BET') {
        coachBadgeEl.innerText = spot.type === 'FACING_3BET' ? (t.drillTypeFacing3Bet || 'Facing 3-Bet') : t.badgeDefend;
        coachBadgeEl.style.background = spot.type === 'FACING_3BET' ? '#4c51bf' : '#3182ce';
        btnCallEl.classList.remove('hidden');
        btnRaiseEl.classList.remove('hidden');
        btnAllInEl.classList.add('hidden');
    } else {
        coachBadgeEl.innerText = t.badgeRfi;
        coachBadgeEl.style.background = '#38a169';
        btnCallEl.classList.add('hidden');
        btnRaiseEl.classList.remove('hidden');
        btnAllInEl.classList.add('hidden');
    }
    coachContentEl.innerHTML = t.diagnosticCoach || t.coachRfi;
    const stackSelector = document.getElementById('stack-selector');
    if (stackSelector) stackSelector.classList.add('hidden');
    const customCtrl = document.getElementById('custom-mode-controls');
    if (customCtrl) customCtrl.classList.add('hidden');
}

function prepareDiagnosticTurn() {
    const session = state.diagnosticSession;
    const spot = getDiagnosticSpot(session.samples.length);
    session.currentSpot = spot;
    session.turnStartedAt = Date.now();
    applyDiagnosticUi(spot);

    if (spot.type === 'DEFEND') {
        const keys = Object.keys(DEFEND_SCENARIOS);
        state.currentMode = 'DEFEND';
        state.currentDefendScenario = keys[session.samples.length % keys.length];
        state.currentPosition = DEFEND_SCENARIOS[state.currentDefendScenario].hero;
    } else if (spot.type === 'PUSH_FOLD') {
        const positions = ['UTG', 'HJ', 'CO', 'BTN', 'SB'];
        state.currentMode = 'PUSH_FOLD';
        state.currentStack = ['8', '10', '12', '15'][session.samples.length % 4];
        state.currentPosition = positions[session.samples.length % positions.length];
    } else if (spot.type === 'FACING_3BET') {
        state.currentMode = 'CUSTOM';
        state.currentPosition = 'CO';
    } else {
        const positions = ['UTG', 'HJ', 'CO', 'BTN', 'SB'];
        state.currentMode = 'RFI';
        state.currentPosition = positions[session.samples.length % positions.length];
    }
}

function evaluateDiagnosticFacing3Bet(hand) {
    const combo = getComboName(hand);
    if (['AA', 'KK', 'QQ', 'AKs', 'AKo'].includes(combo)) {
        return { action: 'Raise', explanation: `Diagnostic Facing 3-Bet: ${combo} is a value 4-bet.` };
    }
    if (['JJ', 'TT', '99', 'AQs', 'AJs', 'KQs', 'AQo'].includes(combo)) {
        return { action: 'Call', explanation: `Diagnostic Facing 3-Bet: ${combo} has enough equity to continue.` };
    }
    return { action: 'Fold', explanation: `Diagnostic Facing 3-Bet: ${combo} is outside the continue range.` };
}

function getDiagnosticMistakeCategory(spot, correctAction) {
    const t = I18N[state.lang] || I18N.en;
    const labels = {
        RFI: t.assessmentLeakRfi || 'Opening range discipline',
        DEFEND: t.assessmentLeakDefense || 'Facing opens',
        PUSH_FOLD: t.assessmentLeakShortStack || 'Short-stack push/fold decisions',
        FACING_3BET: t.assessmentLeakThreeBet || 'Facing 3-bets'
    };
    return `${labels[spot.type] || spot.type} (${correctAction})`;
}

function recordDiagnosticResult(action, correctAction, isCorrect, combo) {
    const session = state.diagnosticSession;
    if (!session || !session.active) return;
    const spot = session.currentSpot || { type: state.currentMode };
    const responseMs = Date.now() - (session.turnStartedAt || Date.now());
    const category = getDiagnosticMistakeCategory(spot, correctAction);
    session.samples.push({ spot: spot.type, combo, action, correctAction, isCorrect, responseMs });
    if (isCorrect) session.correct++;
    session.total++;
    session.totalResponseMs += responseMs;
    if (!isCorrect) session.mistakeCategories[category] = (session.mistakeCategories[category] || 0) + 1;
    if (session.total >= session.targetHands) finishDiagnosticSession();
}

function finishDiagnosticSession() {
    const session = state.diagnosticSession;
    if (!session) return;
    session.active = false;
    const previousDiagnostic = state.assessment && state.assessment.diagnostic;
    const repeatedMistakes = Object.entries(session.mistakeCategories)
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
    const diagnostic = {
        version: 1,
        total: session.total,
        correct: session.correct,
        accuracy: pct(session.correct, session.total),
        averageResponseMs: session.total ? Math.round(session.totalResponseMs / session.total) : 0,
        repeatedMistakes,
        samples: session.samples,
        startedAt: session.startedAt,
        completedAt: new Date().toISOString()
    };
    const skillProfile = buildSkillProfileFromDiagnostic(diagnostic);
    const answers = state.assessment && state.assessment.answers ? state.assessment.answers : getAssessmentAnswersFromForm();
    const recommendedPlan = getAssessmentPlan(answers);
    if (repeatedMistakes.length) {
        recommendedPlan.topLeaks = repeatedMistakes.map(item => item.label);
        recommendedPlan.source = 'diagnostic';
    }
    const weakSpotCounts = session.samples.filter(sample => !sample.isCorrect)
        .reduce((acc, sample) => {
            acc[sample.spot] = (acc[sample.spot] || 0) + 1;
            return acc;
        }, {});
    const spotToMode = { RFI: 'RFI', DEFEND: 'DEFEND', PUSH_FOLD: 'PUSH_FOLD', FACING_3BET: 'FACING_3BET' };
    const weakModes = Object.entries(weakSpotCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([spot]) => spotToMode[spot])
        .filter(Boolean);
    if (weakModes.length) {
        recommendedPlan.adaptivePriorities = [...new Set(weakModes)];
        recommendedPlan.dailyDrill = recommendedPlan.adaptivePriorities[0];
    }
    saveAssessmentProfile({
        status: session.quickStart || (state.assessment && state.assessment.status === 'completed') ? 'completed' : 'in_progress',
        answers,
        diagnostic,
        skillDimensions: skillProfile,
        recommendedPlan
    });
    unlockAchievement('diagnostic_complete', 'Diagnostic completed');
    if (previousDiagnostic && diagnostic.accuracy >= (previousDiagnostic.accuracy || 0) + 5) {
        unlockAchievement('diagnostic_improved', 'Diagnostic improved');
    }
    saveToStorage();
    showToast((I18N[state.lang] || I18N.en).diagnosticComplete || 'Diagnostic complete.', 'success');
    renderAssessmentRecommendation(recommendedPlan);
    renderDiagnosticSummary();
    renderPersonalizedDashboard();
    if (state.firstRunStage === 'diagnostic') {
        state.firstRunStage = 'profile';
        saveToStorage();
        if (typeof window.renderAppShell === 'function') window.renderAppShell();
        return;
    }
    openAssessmentModal();
}

window.startDiagnosticSession = function (targetHands = QUICK_DIAGNOSTIC_HANDS) {
    const parsedTarget = Number(targetHands) || QUICK_DIAGNOSTIC_HANDS;
    state.diagnosticSession = createDiagnosticSession(Math.min(Math.max(parsedTarget, 12), QUICK_DIAGNOSTIC_HANDS), false);
    closeAssessmentModal();
    startTurn();
};

window.startQuickDiagnostic = function () {
    const answers = getAssessmentAnswersFromForm();
    saveAssessmentProfile({
        status: 'in_progress',
        answers,
        recommendedPlan: getAssessmentPlan(answers)
    });
    state.diagnosticSession = createDiagnosticSession(QUICK_DIAGNOSTIC_HANDS, true);
    closeAssessmentModal();
    startTurn();
};

function getActiveCustomDrill() {
    const drill = state.currentCustomDrillId ? state.customDrills[state.currentCustomDrillId] : null;
    return drill && canTrainCustomDrill(drill) ? drill : null;
}

function rangeCodeContainsState(code, combo, expectedState) {
    if (!code) return false;
    const decoded = decodeRangeCodeToEditorState(code);
    return (decoded[combo] || 'fold') === expectedState;
}

function rangeCodeToPlayableSet(code) {
    if (!code) return new Set();
    const decoded = decodeRangeCodeToEditorState(code);
    return new Set(Object.keys(decoded).filter(combo => decoded[combo] !== 'fold'));
}

function rangeCodeHasPlayableCombo(code, combo) {
    if (!code) return false;
    const decoded = decodeRangeCodeToEditorState(code);
    return (decoded[combo] || 'fold') !== 'fold';
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[ch]));
}

function escapeJsArg(value) {
    return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function getLocalizedObjectValue(values, lang) {
    if (!values) return '';
    if (typeof values === 'string') return values;
    const raw = values[lang]
        || (lang === 'zh-CN' ? values['zh-TW'] : '')
        || values.en
        || '';
    if (lang === 'zh-CN' && raw && typeof simplifyChineseText === 'function') {
        return simplifyChineseText(raw);
    }
    return raw;
}

function getGlossaryLocalizedValue(item, field, lang) {
    if (!item || !item[field]) return '';
    return getLocalizedObjectValue(item[field], lang);
}

function getGlossarySlug(englishName) {
    return String(englishName || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function getGlossaryTermId(item) {
    return `glossary-term-${getGlossarySlug(item.en)}`;
}

function getGlossaryAliasParts(label) {
    const raw = String(label || '').trim();
    if (!raw) return [];
    const parts = new Set([raw]);
    const noParen = raw.replace(/[（(].*?[）)]/g, '').trim();
    if (noParen) parts.add(noParen);
    [...raw.matchAll(/[（(]([^）)]+)[）)]/g)].forEach(match => {
        String(match[1] || '').split(/[、/]/).map(item => item.trim()).filter(Boolean).forEach(item => parts.add(item));
    });
    return [...parts].filter(item => item.length >= 2);
}

function escapeRegex(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getGlossaryAliasEntries(lang = state.lang || 'en') {
    const aliases = [];
    POKER_GLOSSARY.forEach(item => {
        const slug = getGlossarySlug(item.en);
        const localName = getGlossaryLocalizedValue(item, 'local', lang);
        const labels = lang === 'en' ? [item.en] : [localName, item.en];
        labels.flatMap(getGlossaryAliasParts).forEach(alias => {
            aliases.push({ alias, slug });
            if (alias.length > 3 && /^[A-Za-z][A-Za-z\s-]+$/.test(alias)) aliases.push({ alias: alias.toLowerCase(), slug });
        });
    });
    const unique = new Map();
    aliases.forEach(entry => {
        if (!unique.has(entry.alias)) unique.set(entry.alias, entry);
    });
    return [...unique.values()].sort((a, b) => b.alias.length - a.alias.length);
}

function linkGlossaryTerms(root) {
    if (!root || typeof document.createTreeWalker !== 'function' || typeof NodeFilter === 'undefined') return;
    const entries = getGlossaryAliasEntries();
    if (!entries.length) return;
    const aliasToSlug = new Map(entries.map(entry => [entry.alias, entry.slug]));
    const matcher = new RegExp(entries.map(entry => escapeRegex(entry.alias)).join('|'), 'g');
    const blockedTags = new Set(['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'SCRIPT', 'STYLE']);
    const linkedSlugs = new Set();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || blockedTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
            if (parent.closest && parent.closest('.poker-glossary, .glossary-inline-link')) return NodeFilter.FILTER_REJECT;
            if (!String(node.nodeValue || '').trim()) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
        const text = String(node.nodeValue || '');
        matcher.lastIndex = 0;
        if (!matcher.test(text)) return;
        matcher.lastIndex = 0;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;
        while ((match = matcher.exec(text)) !== null) {
            const matchedText = match[0];
            const slug = aliasToSlug.get(matchedText);
            if (!slug || linkedSlugs.has(slug)) continue;
            if (match.index > lastIndex) fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'glossary-inline-link';
            button.dataset.glossaryTerm = slug;
            button.textContent = matchedText;
            button.addEventListener('click', event => {
                event.preventDefault();
                openGlossaryTerm(slug);
            });
            fragment.appendChild(button);
            linkedSlugs.add(slug);
            lastIndex = match.index + matchedText.length;
        }
        if (lastIndex === 0) return;
        if (lastIndex < text.length) fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        node.parentNode.replaceChild(fragment, node);
    });
}

function renderPokerGlossary() {
    const container = document.getElementById('poker-glossary-list');
    if (!container) return;
    const lang = state.lang || 'en';
    const grouped = POKER_GLOSSARY.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
    }, {});

    container.innerHTML = Object.entries(grouped).map(([category, items]) => {
        const categoryLabel = getLocalizedObjectValue(POKER_GLOSSARY_CATEGORY_LABELS[category], lang) || category;
        const termsHtml = items.map(item => {
            const localName = getGlossaryLocalizedValue(item, 'local', lang) || item.en;
            const desc = getGlossaryLocalizedValue(item, 'desc', lang) || getGlossaryLocalizedValue(item, 'desc', 'en');
            const titleHtml = lang === 'en'
                ? `<h4>${escapeHtml(item.en)}</h4>`
                : `<h4>${escapeHtml(localName)} <span class="glossary-term-english">${escapeHtml(item.en)}</span></h4>`;
            return `
                <article id="${escapeHtml(getGlossaryTermId(item))}" class="glossary-term">
                    ${titleHtml}
                    <p>${escapeHtml(desc)}</p>
                </article>
            `;
        }).join('');
        return `
            <section class="glossary-category">
                <h4 class="glossary-category-title">${escapeHtml(categoryLabel)}</h4>
                <div class="glossary-term-grid">${termsHtml}</div>
            </section>
        `;
    }).join('');
}

function setInfoModalPage(page = 'rules') {
    const normalizedPage = page === 'glossary' ? 'glossary' : 'rules';
    const rulesPage = document.getElementById('info-rules-page');
    const glossaryPage = document.getElementById('info-glossary-page');
    const rulesTab = document.getElementById('info-tab-rules');
    const glossaryTab = document.getElementById('info-tab-glossary');
    if (rulesPage) rulesPage.classList.toggle('hidden', normalizedPage !== 'rules');
    if (glossaryPage) glossaryPage.classList.toggle('hidden', normalizedPage !== 'glossary');
    if (rulesTab) {
        rulesTab.classList.toggle('active', normalizedPage === 'rules');
        rulesTab.setAttribute('aria-selected', normalizedPage === 'rules' ? 'true' : 'false');
    }
    if (glossaryTab) {
        glossaryTab.classList.toggle('active', normalizedPage === 'glossary');
        glossaryTab.setAttribute('aria-selected', normalizedPage === 'glossary' ? 'true' : 'false');
    }
    renderPokerGlossary();
    if (normalizedPage === 'rules') linkGlossaryTerms(rulesPage);
}

function openGlossaryTerm(slug) {
    const modal = document.getElementById('info-modal');
    if (!modal) return;
    if (modal.classList.contains('hidden')) modal.classList.remove('hidden');
    setInfoModalPage('glossary');
    const target = document.getElementById(`glossary-term-${slug}`);
    if (!target) return;
    document.querySelectorAll('.glossary-term.is-highlighted').forEach(el => el.classList.remove('is-highlighted'));
    target.classList.add('is-highlighted');
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

window.openGlossaryTerm = openGlossaryTerm;
window.setInfoModalPage = setInfoModalPage;

function getDateKey(date = new Date()) {
    return date.toISOString().slice(0, 10);
}

function getModeLabel(mode, t = I18N[state.lang] || I18N.en) {
    const labels = {
        RFI: t.badgeRfi || 'RFI',
        DEFEND: t.badgeDefend || 'Defense',
        PUSH_FOLD: t.badgePushFold || 'Push/Fold',
        FACING_3BET: t.drillTypeFacing3Bet || 'Facing 3-Bet',
        CUSTOM: t.badgeCustom || 'Custom',
        ALL_STREET: t.modeAllStreetShort || 'Postflop',
        REVIEW: t.modeReviewMistakesShort || 'Review',
        FOCUS: t.focusSessionTitle || 'Focus Session'
    };
    return labels[mode] || mode;
}

function getSpotTypeLabel(type, t = I18N[state.lang] || I18N.en) {
    const labels = {
        ...{
            RFI: getModeLabel('RFI', t),
            DEFEND: getModeLabel('DEFEND', t),
            PUSH_FOLD: getModeLabel('PUSH_FOLD', t),
            CUSTOM: getModeLabel('CUSTOM', t),
            ALL_STREET: getModeLabel('ALL_STREET', t),
            REVIEW: getModeLabel('REVIEW', t),
            FACING_3BET: t.drillTypeFacing3Bet || 'Facing 3-Bet',
            RFI_FOCUS: t.drillTypeRfi || 'RFI Focus',
            DEFENSE_VS_OPEN: t.drillTypeDefense || 'Defense vs Open'
        },
        [DRILL_TYPES.PUSH_FOLD]: t.drillTypePushFold || 'Push/Fold',
        [DRILL_TYPES.ALL_STREET]: t.drillTypeAllStreet || t.modeAllStreetShort || 'Postflop'
    };
    return labels[type] || getModeLabel(type, t);
}

function getStackDepthKeyFromBb(bb) {
    const numeric = Number(bb);
    if (Number.isFinite(numeric) && numeric <= 15) return 'short';
    if (Number.isFinite(numeric) && numeric <= 40) return 'medium';
    return 'deep';
}

function getStackDepthLabel(key, t = I18N[state.lang] || I18N.en) {
    const labels = {
        short: t.reviewStackShort || 'Short · 15bb or less',
        medium: t.reviewStackMedium || 'Medium · 16-40bb',
        deep: t.reviewStackDeep || 'Deep · 41bb+'
    };
    return labels[key] || key;
}

function getEffectiveStackBbForStat(mode, drill = null) {
    if (mode === 'REVIEW' && state.currentReviewItem && state.currentReviewItem.stack) return Number(state.currentReviewItem.stack);
    if (mode === 'PUSH_FOLD') return Number(state.currentStack);
    if (mode === 'ALL_STREET') {
        const scenario = getActiveAllStreetScenario();
        return scenario && Number(scenario.effectiveStackBb) > 0 ? Number(scenario.effectiveStackBb) : 100;
    }
    if (mode === 'CUSTOM' && drill) {
        if (drill.type === DRILL_TYPES.PUSH_FOLD && Number(drill.stackBb) > 0) return Number(drill.stackBb);
        if (Number(drill.effectiveStackBb) > 0) return Number(drill.effectiveStackBb);
    }
    return 100;
}

function getSpotTypeKeyForStat(mode, drill = null) {
    if (mode === 'REVIEW' && state.currentReviewItem) return getReviewSourceMode(state.currentReviewItem);
    if (mode === 'CUSTOM' && drill && drill.type) return drill.type;
    return mode;
}

function getBaselineLevel(accuracy, averageResponseMs) {
    if (accuracy >= 90 && averageResponseMs <= 3500) return 'Advanced';
    if (accuracy >= 78) return 'Intermediate';
    if (accuracy >= 60) return 'Beginner+';
    return 'Beginner';
}

function createDiagnosticSession(targetHands = QUICK_DIAGNOSTIC_HANDS, quickStart = false) {
    return {
        active: true,
        quickStart,
        targetHands,
        total: 0,
        correct: 0,
        totalResponseMs: 0,
        mistakeCategories: {},
        samples: [],
        currentSpot: null,
        startedAt: new Date().toISOString(),
        turnStartedAt: Date.now()
    };
}

function buildSkillProfileFromDiagnostic(diagnostic) {
    const dimensions = {};
    const samples = Array.isArray(diagnostic.samples) ? diagnostic.samples : [];
    for (const sample of samples) {
        const key = sample.spot || 'RFI';
        if (!dimensions[key]) dimensions[key] = { hands: 0, correct: 0, totalResponseMs: 0, accuracy: 0, averageResponseMs: 0 };
        dimensions[key].hands++;
        if (sample.isCorrect) dimensions[key].correct++;
        dimensions[key].totalResponseMs += sample.responseMs || 0;
    }
    Object.values(dimensions).forEach(dim => {
        dim.accuracy = pct(dim.correct, dim.hands);
        dim.averageResponseMs = dim.hands ? Math.round(dim.totalResponseMs / dim.hands) : 0;
    });

    const ranked = Object.entries(dimensions)
        .filter(([, dim]) => dim.hands > 0)
        .sort((a, b) => a[1].accuracy - b[1].accuracy || b[1].hands - a[1].hands);
    const weakestDimension = ranked[0] ? ranked[0][0] : null;
    const strongestDimension = ranked.length ? ranked[ranked.length - 1][0] : null;
    const overallAccuracy = diagnostic.accuracy ?? pct(diagnostic.correct || 0, diagnostic.total || 0);
    const averageResponseMs = diagnostic.averageResponseMs || 0;

    return {
        overallAccuracy,
        averageResponseMs,
        baselineLevel: getBaselineLevel(overallAccuracy, averageResponseMs),
        weakestDimension,
        strongestDimension,
        dimensions
    };
}

function getReviewSourceMode(item) {
    if (!item) return 'REVIEW';
    return item.spot || item.sourceMode || item.mode || 'REVIEW';
}

function incrementStatBucket(collection, key, isCorrect) {
    if (!key) return;
    if (!collection[key]) collection[key] = { hands: 0, correct: 0 };
    collection[key].hands++;
    if (isCorrect) collection[key].correct++;
}

function recordStat(position, mode, isCorrect, drillId) {
    state.stats.totalHands++;
    if (isCorrect) state.stats.totalCorrect++;
    if (!state.stats.byPosition[position]) state.stats.byPosition[position] = { hands: 0, correct: 0 };
    state.stats.byPosition[position].hands++;
    if (isCorrect) state.stats.byPosition[position].correct++;
    if (!state.stats.byMode[mode]) state.stats.byMode[mode] = { hands: 0, correct: 0 };
    state.stats.byMode[mode].hands++;
    if (isCorrect) state.stats.byMode[mode].correct++;
    if (drillId) {
        if (!state.stats.byCustomDrill) state.stats.byCustomDrill = {};
        if (!state.stats.byCustomDrill[drillId]) state.stats.byCustomDrill[drillId] = { hands: 0, correct: 0 };
        state.stats.byCustomDrill[drillId].hands++;
        if (isCorrect) state.stats.byCustomDrill[drillId].correct++;
    }
    if (!state.stats.byStackDepth) state.stats.byStackDepth = {};
    if (!state.stats.bySpotType) state.stats.bySpotType = {};
    const drill = drillId ? state.customDrills[drillId] : null;
    incrementStatBucket(state.stats.byStackDepth, getStackDepthKeyFromBb(getEffectiveStackBbForStat(mode, drill)), isCorrect);
    incrementStatBucket(state.stats.bySpotType, getSpotTypeKeyForStat(mode, drill), isCorrect);
}

function updateComboWeight(combo, isCorrect) {
    const cur = state.comboWeights[combo] || 1.0;
    state.comboWeights[combo] = isCorrect
        ? Math.max(0.5, cur * 0.8)
        : Math.min(5.0, cur * 1.5);
}

function getAdaptiveComboMultiplier(combo) {
    const plan = state.assessment && state.assessment.recommendedPlan;
    const priorities = plan && Array.isArray(plan.adaptivePriorities) ? plan.adaptivePriorities : [];
    if (!priorities.length) return 1;

    const rfiEdgeCombos = new Set(['AJo', 'ATo', 'KQo', 'KJo', 'QJo', 'A9s', 'A8s', 'KTs', 'QTs', 'JTs', 'T9s', '66', '55', '44']);
    const defenseCombos = new Set(['JJ', 'TT', '99', '88', '77', 'AQs', 'AJs', 'ATs', 'KQs', 'KJs', 'QJs', 'A5s', 'A4s', 'AQo', 'KQo']);
    const pushCombos = new Set(['22', '33', '44', '55', 'A2s', 'A3s', 'A4s', 'A5s', 'A7o', 'A8o', 'K9s', 'KTo', 'QTs', 'JTs']);

    if (state.currentMode === 'RFI' && priorities.includes('RFI') && rfiEdgeCombos.has(combo)) return 1.45;
    if (state.currentMode === 'DEFEND' && priorities.includes('DEFEND') && defenseCombos.has(combo)) return 1.45;
    if (state.currentMode === 'PUSH_FOLD' && priorities.includes('PUSH_FOLD') && pushCombos.has(combo)) return 1.45;
    if (state.currentMode === 'CUSTOM' && priorities.includes('FACING_3BET') && defenseCombos.has(combo)) return 1.45;
    return 1;
}

// ============================================================
// WEIGHTED HAND SAMPLING (Adaptive Difficulty)
// ============================================================
function generateHandWeighted() {
    const weights = ALL_COMBOS.map(c => c.baseWeight * (state.comboWeights[c.name] || 1.0) * getAdaptiveComboMultiplier(c.name));
    const total = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * total;
    let chosen = ALL_COMBOS[ALL_COMBOS.length - 1];
    for (let i = 0; i < ALL_COMBOS.length; i++) {
        rand -= weights[i];
        if (rand <= 0) { chosen = ALL_COMBOS[i]; break; }
    }
    return comboToHand(chosen.name);
}

function comboToHand(comboName) {
    const isPair = comboName.length === 2 && comboName[0] === comboName[1];
    const isSuited = comboName.endsWith('s');
    const isOffsuit = comboName.endsWith('o');
    let r1, r2;
    if (isPair) {
        r1 = r2 = comboName[0];
    } else {
        r1 = comboName[0];
        r2 = comboName[1];
    }
    const shuffled = [...SUITS].sort(() => Math.random() - 0.5);
    let s1 = shuffled[0], s2 = shuffled[1];
    if (isSuited) s2 = s1;
    if (isOffsuit) { while (s2 === s1) { s2 = SUITS[Math.floor(Math.random() * 4)]; } }
    if (isPair) { while (s2 === s1) { s2 = SUITS[Math.floor(Math.random() * 4)]; } }
    return { c1: { rank: r1, suit: s1 }, c2: { rank: r2, suit: s2 } };
}

// ============================================================
// HELPERS
// ============================================================
function getComboName(hand) {
    if (!hand) return '';
    const isSuited = hand.c1.suit === hand.c2.suit;
    const isPair = hand.c1.rank === hand.c2.rank;
    const r1Idx = CHART_RANKS.indexOf(hand.c1.rank);
    const r2Idx = CHART_RANKS.indexOf(hand.c2.rank);
    const high = r1Idx <= r2Idx ? hand.c1.rank : hand.c2.rank;
    const low = r1Idx <= r2Idx ? hand.c2.rank : hand.c1.rank;
    return isPair ? `${high}${low}` : `${high}${low}${isSuited ? 's' : 'o'}`;
}

function suitSymbol(suit) {
    return { hearts: '♥', diamonds: '♦', clubs: '♣', spades: '♠' }[suit] || '';
}
function cardColor(suit) {
    return (suit === 'hearts' || suit === 'diamonds') ? 'red' : 'black';
}
function renderCard(card) {
    const sym = suitSymbol(card.suit);
    const cls = cardColor(card.suit);
    return `<div class="card ${cls}"><div class="rank">${card.rank}</div><div class="suit">${sym}</div></div>`;
}

function triggerHaptic(pattern) {
    if (!navigator.vibrate) return;
    const activation = navigator.userActivation;
    if (activation && !activation.isActive && !activation.hasBeenActive) return;
    navigator.vibrate(pattern);
}

// Toast System
window.showToast = function (msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = { success: '✅', error: '❌', info: 'ℹ️' }[type] || 'ℹ️';
    toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3200);
};

let pendingGlassConfirm = null;

function getBrowserElement(id) {
    const el = document.getElementById(id);
    return (typeof Element !== 'undefined' && el instanceof Element) ? el : null;
}

function shouldUseNativeConfirmFallback() {
    if (typeof window === 'undefined' || typeof window.confirm !== 'function') return false;
    try {
        return !/\[native code\]/.test(Function.prototype.toString.call(window.confirm));
    } catch {
        return false;
    }
}

function requestGlassConfirmation(options) {
    const t = I18N[state.lang] || I18N.en;
    const message = options.message || t.confirmTitle || 'Confirm action';
    const modal = getBrowserElement('confirm-modal');
    const titleEl = getBrowserElement('confirm-title');
    const messageEl = getBrowserElement('confirm-message');
    const acceptBtn = getBrowserElement('confirm-accept');
    const cancelBtn = getBrowserElement('confirm-cancel');
    const closeBtn = getBrowserElement('confirm-close');
    const canRenderGlassConfirm = modal && titleEl && messageEl && acceptBtn && cancelBtn && closeBtn;

    if (!canRenderGlassConfirm || shouldUseNativeConfirmFallback()) {
        return typeof confirm === 'function' ? confirm(message) : true;
    }

    if (pendingGlassConfirm) pendingGlassConfirm(false);

    titleEl.textContent = options.title || t.confirmTitle || 'Confirm action';
    messageEl.textContent = message;
    acceptBtn.textContent = options.confirmLabel || t.confirmOk || 'Confirm';
    cancelBtn.textContent = options.cancelLabel || t.confirmCancel || 'Cancel';
    acceptBtn.classList.toggle('btn-danger', !!options.danger);
    modal.classList.remove('hidden');

    const previousActive = document.activeElement;

    return new Promise(resolve => {
        let settled = false;

        const finish = value => {
            if (settled) return;
            settled = true;
            modal.classList.add('hidden');
            acceptBtn.removeEventListener('click', accept);
            cancelBtn.removeEventListener('click', cancel);
            closeBtn.removeEventListener('click', cancel);
            modal.removeEventListener('click', onBackdrop);
            document.removeEventListener('keydown', onKeydown);
            pendingGlassConfirm = null;
            if (previousActive && typeof previousActive.focus === 'function') previousActive.focus();
            resolve(value);
        };

        const accept = () => finish(true);
        const cancel = () => finish(false);
        const onBackdrop = event => {
            if (event.target === modal) finish(false);
        };
        const onKeydown = event => {
            if (event.key === 'Escape') finish(false);
        };

        pendingGlassConfirm = finish;
        acceptBtn.addEventListener('click', accept);
        cancelBtn.addEventListener('click', cancel);
        closeBtn.addEventListener('click', cancel);
        modal.addEventListener('click', onBackdrop);
        document.addEventListener('keydown', onKeydown);
        requestAnimationFrame(() => cancelBtn.focus());
    });
}

function runAfterConfirmation(result, onConfirm) {
    if (result && typeof result.then === 'function') {
        return result.then(ok => {
            if (ok) onConfirm();
            return ok;
        });
    }
    if (result) onConfirm();
    return result;
}

function pct(correct, total) {
    return total === 0 ? 0 : Math.round((correct / total) * 100);
}

function getWeekKey(date = new Date()) {
    const year = date.getFullYear();
    const start = new Date(year, 0, 1);
    const day = Math.floor((date - start) / 86400000);
    return `${year}-W${String(Math.ceil((day + start.getDay() + 1) / 7)).padStart(2, '0')}`;
}

function getMasteryKey(mode, drill) {
    if (mode === 'REVIEW' && state.currentReviewItem) return getReviewSourceMode(state.currentReviewItem);
    if (drill) return `CUSTOM:${drill.id}`;
    if (state.diagnosticSession && state.diagnosticSession.active && state.diagnosticSession.currentSpot && state.diagnosticSession.currentSpot.type === 'FACING_3BET') return 'FACING_3BET';
    if (mode === 'CUSTOM') return 'CUSTOM_RANGE';
    return mode;
}

function unlockAchievement(id, label) {
    if (!state.gamification.achievements.some(item => item.id === id)) {
        state.gamification.achievements.push({ id, label, unlockedAt: new Date().toISOString() });
    }
}

function recordGamification(mode, isCorrect, drill) {
    if (!state.gamification) return;
    const qualityXp = isCorrect ? (mode === 'REVIEW' ? 14 : 12) : 2;
    state.gamification.xp += qualityXp;
    const key = getMasteryKey(mode, drill);
    if (!state.gamification.mastery[key]) state.gamification.mastery[key] = { hands: 0, correct: 0, level: 0 };
    const mastery = state.gamification.mastery[key];
    mastery.hands++;
    if (isCorrect) mastery.correct++;
    mastery.level = Math.min(100, pct(mastery.correct, Math.max(20, mastery.hands)));

    const week = getWeekKey();
    if (!state.gamification.weeklyActivity[week]) state.gamification.weeklyActivity[week] = { hands: 0, correct: 0 };
    state.gamification.weeklyActivity[week].hands++;
    if (isCorrect) state.gamification.weeklyActivity[week].correct++;

    const today = getDateKey();
    if (!state.gamification.dailyActivity) state.gamification.dailyActivity = {};
    if (!state.gamification.dailyActivity[today]) state.gamification.dailyActivity[today] = { hands: 0, correct: 0, goal: DAILY_HAND_GOAL, completed: false };
    state.gamification.dailyActivity[today].hands++;
    if (isCorrect) state.gamification.dailyActivity[today].correct++;
    if (state.gamification.dailyActivity[today].hands >= DAILY_HAND_GOAL && !state.gamification.dailyActivity[today].completed) {
        state.gamification.dailyActivity[today].completed = true;
        unlockAchievement('daily_goal', 'Daily goal completed');
    }

    if (state.stats.totalHands === 1) unlockAchievement('first_hand', 'First hand trained');
    if (state.streak >= 5) unlockAchievement('streak_5', 'Five-hand streak');
    if (state.streak >= 10) unlockAchievement('streak_10', 'Ten-hand streak');
    if (state.stats.totalHands >= 100) unlockAchievement('hands_100', '100 hands trained');
    if (mastery.hands >= 100 && mastery.level >= 80) unlockAchievement(`mastery_${key}`, `${key} 80% mastery`);
    if (drill) unlockAchievement('custom_drill', 'Custom drill trained');
}

function getWeeklySummary() {
    const week = getWeekKey();
    const current = state.gamification.weeklyActivity[week] || { hands: 0, correct: 0 };
    const keys = Object.keys(state.gamification.weeklyActivity).sort();
    const prevKey = keys.filter(key => key !== week).pop();
    const previous = prevKey ? state.gamification.weeklyActivity[prevKey] : { hands: 0, correct: 0 };
    const currentAccuracy = pct(current.correct, current.hands);
    const previousAccuracy = pct(previous.correct, previous.hands);
    const plan = state.assessment && state.assessment.recommendedPlan;
    return {
        hands: current.hands,
        accuracy: currentAccuracy,
        trend: currentAccuracy - previousAccuracy,
        previousHands: previous.hands,
        nextDrill: plan && plan.dailyDrill ? plan.dailyDrill : 'RFI'
    };
}

function createTrainingSession(mode = state.currentMode, targetHands = TRAINING_SESSION_HANDS) {
    const before = { ...(state.stats.byMode[mode] || { hands: 0, correct: 0 }) };
    return {
        id: generateStableId('session'),
        mode,
        targetHands,
        hands: 0,
        correct: 0,
        mistakes: {},
        startedAt: new Date().toISOString(),
        beforeAccuracy: pct(before.correct || 0, before.hands || 0),
        completed: false
    };
}

function getActiveTrainingSession(mode) {
    if (!state.trainingSession || state.trainingSession.completed || state.trainingSession.mode !== mode) {
        state.trainingSession = createTrainingSession(mode);
    }
    return state.trainingSession;
}

function getMistakeLabel(mode, position, correctAction) {
    const t = I18N[state.lang] || I18N.en;
    if (mode === 'RFI') return `${t.assessmentLeakRfi || 'Opening range discipline'} (${position})`;
    if (mode === 'DEFEND') return `${t.assessmentLeakDefense || 'Facing opens'} (${correctAction})`;
    if (mode === 'PUSH_FOLD') return `${t.assessmentLeakShortStack || 'Short-stack push/fold decisions'} (${position})`;
    if (mode === 'ALL_STREET') return `${t.assessmentLeakPostflop || 'Postflop sizing and texture'} (${getFeedbackActionLabel(correctAction)})`;
    if (mode === 'CUSTOM') return `${t.assessmentLeakThreeBet || 'Facing 3-bets'} (${correctAction})`;
    if (mode === 'REVIEW') return t.modeReviewMistakesShort || 'Review';
    return `${mode} (${correctAction})`;
}

function addMistakeReplayItem(entry) {
    if (!state.mistakeReplay) state.mistakeReplay = getDefaultMistakeReplay();
    const item = {
        id: generateStableId('mistake'),
        combo: entry.combo,
        position: entry.position,
        mode: entry.mode,
        sourceMode: entry.sourceMode || entry.mode,
        spot: entry.spot || entry.mode,
        stack: entry.stack || null,
        drillId: entry.drillId || null,
        scenario: entry.scenario || '',
        userAction: entry.userAction,
        correctAction: entry.correctAction,
        explanation: entry.explanation || '',
        attempts: 0,
        addedAt: new Date().toISOString()
    };
    state.mistakeReplay.queue = [item, ...state.mistakeReplay.queue.filter(existing => existing.combo !== item.combo || existing.spot !== item.spot)]
        .slice(0, MISTAKE_REPLAY_LIMIT);
    return item;
}

function getNextMistakeReplayItem() {
    if (!state.mistakeReplay || !state.mistakeReplay.queue.length) return null;
    return state.mistakeReplay.queue[0];
}

function completeMistakeReplayItem(item, isCorrect) {
    if (!item || !state.mistakeReplay) return;
    item.attempts = (item.attempts || 0) + 1;
    if (isCorrect) {
        state.mistakeReplay.queue = state.mistakeReplay.queue.filter(existing => existing.id !== item.id);
        state.mistakeReplay.completed.unshift({ ...item, completedAt: new Date().toISOString() });
        state.mistakeReplay.completed = state.mistakeReplay.completed.slice(0, MISTAKE_REPLAY_LIMIT);
        unlockAchievement('leak_replayed', 'Mistake replay cleared');
    } else {
        state.mistakeReplay.queue = [item, ...state.mistakeReplay.queue.filter(existing => existing.id !== item.id)].slice(0, MISTAKE_REPLAY_LIMIT);
    }
}

function getAdImpressionsToday() {
    if (!state.monetization) return 0;
    const impressions = state.monetization.adImpressionsByDate || {};
    const count = impressions[getDateKey()];
    return Number.isFinite(count) ? count : 0;
}

function shouldShowLowFrequencyAd(activeDecision = false) {
    if (activeDecision) return false;
    if (!isAdServiceConfigured()) return false;
    if (!state.monetization || state.monetization.lifetimeAdFree) return false;
    if (getAdImpressionsToday() >= AD_DAILY_LIMIT) return false;
    return (state.monetization.completedSessionsSinceAd || 0) >= AD_SESSION_THRESHOLD
        || (state.monetization.answeredHandsSinceAd || 0) >= AD_HAND_THRESHOLD;
}

function recordAdImpression() {
    if (!state.monetization) state.monetization = getDefaultMonetization();
    if (!state.monetization.adImpressionsByDate || typeof state.monetization.adImpressionsByDate !== 'object') {
        state.monetization.adImpressionsByDate = {};
    }
    const today = getDateKey();
    state.monetization.adImpressions++;
    state.monetization.adImpressionsByDate[today] = getAdImpressionsToday() + 1;
    state.monetization.completedSessionsSinceAd = 0;
    state.monetization.answeredHandsSinceAd = 0;
    state.monetization.lastAdDate = today;
    saveToStorage();
}

function getAdServiceConfig() {
    const source = (typeof window !== 'undefined' && window.PREFLOP_AD_CONFIG && typeof window.PREFLOP_AD_CONFIG === 'object')
        ? window.PREFLOP_AD_CONFIG
        : {};
    return {
        ...AD_SERVICE_DEFAULTS,
        ...source,
        enabled: !!source.enabled,
        gptAdUnitPath: String(source.gptAdUnitPath || '').trim(),
        enableHouseAdFallback: !!source.enableHouseAdFallback
    };
}

function isAdServiceConfigured() {
    const config = getAdServiceConfig();
    return config.enabled && config.provider === 'google-publisher-tag' && !!config.gptAdUnitPath;
}

let googlePublisherTagLoadPromise = null;

function isGooglePublisherTagReady() {
    return typeof window !== 'undefined'
        && !!window.googletag
        && typeof window.googletag.defineOutOfPageSlot === 'function'
        && window.googletag.enums
        && window.googletag.enums.OutOfPageFormat;
}

function loadGooglePublisherTag() {
    if (isGooglePublisherTagReady()) return Promise.resolve();
    if (googlePublisherTagLoadPromise) return googlePublisherTagLoadPromise;
    if (typeof document === 'undefined') return Promise.reject(new Error('Document is unavailable.'));

    window.googletag = window.googletag || { cmd: [] };
    googlePublisherTagLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = GOOGLE_PUBLISHER_TAG_URL;
        script.onload = () => resolve();
        script.onerror = () => {
            googlePublisherTagLoadPromise = null;
            reject(new Error('Google Publisher Tag failed to load.'));
        };
        const parent = document.head || document.body;
        if (!parent || typeof parent.appendChild !== 'function') {
            googlePublisherTagLoadPromise = null;
            reject(new Error('No document head/body available for ad script.'));
            return;
        }
        parent.appendChild(script);
    });
    return googlePublisherTagLoadPromise;
}

async function requestGooglePublisherInterstitial() {
    const config = getAdServiceConfig();
    if (!isAdServiceConfigured()) return false;
    try {
        await loadGooglePublisherTag();
        const tag = window.googletag;
        return await new Promise(resolve => {
            const runRequest = () => {
                try {
                    const format = tag.enums && tag.enums.OutOfPageFormat && tag.enums.OutOfPageFormat.INTERSTITIAL;
                    if (!format || typeof tag.defineOutOfPageSlot !== 'function') {
                        resolve(false);
                        return;
                    }
                    const slot = tag.defineOutOfPageSlot(config.gptAdUnitPath, format);
                    if (!slot) {
                        resolve(false);
                        return;
                    }
                    if (typeof slot.addService === 'function' && typeof tag.pubads === 'function') {
                        slot.addService(tag.pubads());
                    }
                    if (typeof tag.enableServices === 'function') tag.enableServices();
                    if (typeof tag.display === 'function') tag.display(slot);
                    resolve(true);
                } catch (error) {
                    console.warn('GPT interstitial request failed.', error);
                    resolve(false);
                }
            };

            if (tag.cmd && typeof tag.cmd.push === 'function') tag.cmd.push(runRequest);
            else runRequest();
        });
    } catch (error) {
        console.warn('GPT interstitial unavailable.', error);
        return false;
    }
}

function renderMonetizationSlot() {
    const t = I18N[state.lang] || I18N.en;
    return `
        <div class="support-slot" role="note">
            <div>
                <strong>${t.donateSlotTitle || 'Support Preflop'}</strong>
                <p>${t.donateSlotBody || 'Donations help keep the trainer free, offline-first, and account-free.'}</p>
            </div>
            <button class="btn-range-action" type="button" onclick="recordDonateIntent()">${t.donateCta || 'Donate'}</button>
        </div>
    `;
}

function openHouseAdModal() {
    if (!shouldShowLowFrequencyAd(false)) return false;
    const modal = document.getElementById('ad-modal');
    const title = document.getElementById('ad-modal-title');
    const body = document.getElementById('ad-modal-body');
    if (!modal || !body) return false;
    const t = I18N[state.lang] || I18N.en;
    const titleText = t.adSlotTitle || 'Sponsor note';
    if (title) title.innerText = titleText;
    body.innerHTML = `
        <div class="ad-modal-copy">
            <strong>${escapeHtml(titleText)}</strong>
            <p>${escapeHtml(t.adSlotBody || 'A low-frequency sponsor placement can appear here between sessions.')}</p>
            <p class="ad-frequency-note">${escapeHtml(t.adFrequencyNote || 'Ads never appear during a hand decision and are capped at three per day.')}</p>
        </div>
    `;
    recordAdImpression();
    modal.classList.remove('hidden');
    const closeButton = document.getElementById('ad-modal-close');
    if (closeButton && typeof closeButton.focus === 'function') closeButton.focus();
    return true;
}

async function openViewportAdModal() {
    if (!shouldShowLowFrequencyAd(false)) return false;
    const gptShown = await requestGooglePublisherInterstitial();
    if (gptShown) {
        recordAdImpression();
        const modal = document.getElementById('ad-modal');
        if (modal) modal.classList.add('hidden');
        return true;
    }

    if (getAdServiceConfig().enableHouseAdFallback) {
        return openHouseAdModal();
    }
    return false;
}

function getCurrentTrainingPlan() {
    return state.assessment && state.assessment.recommendedPlan
        ? state.assessment.recommendedPlan
        : getAssessmentPlan({ experience: 'beginner', gameType: 'cash', stackFocus: 'deep', confidence: 'medium' });
}

function resolvePlanTrainingTarget(target, quiet = false) {
    const t = I18N[state.lang] || I18N.en;
    const planTarget = target || 'RFI';
    if (planTarget === 'FACING_3BET') {
        const drill = listCustomDrills().find(item => item.type === DRILL_TYPES.FACING_3BET && canTrainCustomDrill(item));
        if (drill) return { mode: 'CUSTOM', target: planTarget, drillId: drill.id };
        if (!quiet) showToast(t.assessmentThreeBetFallback || 'Facing 3-Bet needs a custom drill. Starting Defense instead.', 'info');
        return { mode: 'DEFEND', target: 'DEFEND', drillId: null };
    }
    const modeMap = { RFI: 'RFI', DEFEND: 'DEFEND', PUSH_FOLD: 'PUSH_FOLD', CUSTOM: 'CUSTOM' };
    return { mode: modeMap[planTarget] || planTarget || 'RFI', target: planTarget, drillId: null };
}

function createFocusSession(targetHands = TRAINING_SESSION_HANDS) {
    const plan = getCurrentTrainingPlan();
    const target = plan && (plan.dailyDrill || (plan.adaptivePriorities && plan.adaptivePriorities[0]) || (plan.recommendedModes && plan.recommendedModes[0])) || 'RFI';
    const resolved = resolvePlanTrainingTarget(target, true);
    const reviewCount = state.mistakeReplay && state.mistakeReplay.queue ? state.mistakeReplay.queue.length : 0;
    const reviewHandsTarget = reviewCount > 0 ? Math.min(reviewCount, Math.max(1, Math.round(targetHands * 0.3))) : 0;
    return {
        id: generateStableId('focus'),
        active: true,
        mode: 'FOCUS',
        targetHands,
        hands: 0,
        correct: 0,
        mistakes: {},
        focusMode: resolved.mode,
        focusTarget: resolved.target,
        focusDrillId: resolved.drillId,
        focusHandsUsed: 0,
        reviewHandsTarget,
        reviewHandsUsed: 0,
        startedAt: new Date().toISOString(),
        beforeAccuracy: pct(state.stats.totalCorrect || 0, state.stats.totalHands || 0),
        completed: false
    };
}

function shouldUseFocusReviewTurn(session) {
    if (!session || !session.active || session.reviewHandsUsed >= session.reviewHandsTarget) return false;
    if (!getNextMistakeReplayItem()) return false;
    const nextIndex = session.hands + 1;
    const slotsRemaining = session.targetHands - session.hands;
    const reviewRemaining = session.reviewHandsTarget - session.reviewHandsUsed;
    return nextIndex % 3 === 0 || reviewRemaining >= slotsRemaining;
}

function applyFocusSessionMode() {
    const session = state.focusSession;
    if (!session || !session.active) return false;
    const useReview = shouldUseFocusReviewTurn(session);
    const mode = useReview ? 'REVIEW' : session.focusMode;
    state.currentCustomDrillId = mode === 'CUSTOM' ? session.focusDrillId : state.currentCustomDrillId;
    state.currentCustomPracticeType = mode === 'CUSTOM' && session.focusDrillId ? 'drill' : state.currentCustomPracticeType;
    const selector = document.getElementById('mode-selector');
    if (selector) selector.value = mode;
    changeMode(mode, true);
    return true;
}

function startFocusSessionTurn() {
    if (!state.focusSession || !state.focusSession.active) return false;
    return applyFocusSessionMode();
}

function recordFocusSessionResult(mode, isCorrect, mistakeLabel) {
    const session = state.focusSession;
    if (!session || !session.active) return false;
    session.hands++;
    if (isCorrect) session.correct++;
    if (mode === 'REVIEW') session.reviewHandsUsed++;
    else session.focusHandsUsed++;
    if (!isCorrect && mistakeLabel) session.mistakes[mistakeLabel] = (session.mistakes[mistakeLabel] || 0) + 1;

    if (!state.monetization) state.monetization = getDefaultMonetization();
    state.monetization.answeredHandsSinceAd++;

    if (session.hands >= session.targetHands) {
        session.completed = true;
        session.active = false;
        state.monetization.completedSessionsSinceAd++;
        unlockAchievement('focus_session_complete', 'Focus session completed');
        renderSessionSummary(session);
    }
    return true;
}

function getSessionSummary(session) {
    const modeStats = session.mode === 'FOCUS'
        ? { hands: state.stats.totalHands, correct: state.stats.totalCorrect }
        : state.stats.byMode[session.mode] || { hands: 0, correct: 0 };
    const afterAccuracy = pct(modeStats.correct || 0, modeStats.hands || 0);
    const mistakes = Object.entries(session.mistakes || {})
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
    const plan = state.assessment && state.assessment.recommendedPlan;
    return {
        mode: session.mode,
        hands: session.hands,
        correct: session.correct,
        accuracy: pct(session.correct, session.hands),
        beforeAccuracy: session.beforeAccuracy || 0,
        afterAccuracy,
        improvement: afterAccuracy - (session.beforeAccuracy || 0),
        mistakes,
        nextDrill: plan && plan.dailyDrill ? plan.dailyDrill : session.mode
    };
}

function renderSessionSummary(session) {
    const modal = document.getElementById('session-summary-modal');
    const content = document.getElementById('session-summary-content');
    if (!modal || !content || !session) return;
    const t = I18N[state.lang] || I18N.en;
    const summary = getSessionSummary(session);
    const showAd = shouldShowLowFrequencyAd(false);
    const mistakeRows = summary.mistakes.length
        ? summary.mistakes.map(item => `<li>${escapeHtml(item.label)}: ${item.count}</li>`).join('')
        : `<li>${t.sessionNoLeaks || 'No repeated leak this session.'}</li>`;
    content.innerHTML = `
        <div class="session-summary-grid">
            <div><span>${t.statsAccuracy || 'Accuracy'}</span><strong>${summary.accuracy}%</strong></div>
            <div><span>${t.sessionImprovement || 'Mode trend'}</span><strong>${summary.improvement >= 0 ? '+' : ''}${summary.improvement}%</strong></div>
            <div><span>${t.personalizedNextDrill || 'Next drill'}</span><strong>${getModeLabel(summary.nextDrill, t)}</strong></div>
        </div>
        <h3>${t.sessionTopLeaks || 'Focus next'}</h3>
        <ul>${mistakeRows}</ul>
        ${renderMonetizationSlot()}
    `;
    modal.classList.remove('hidden');
    if (showAd) openViewportAdModal();
}

function recordTrainingSessionResult(mode, isCorrect, mistakeLabel) {
    if (state.diagnosticSession && state.diagnosticSession.active) return;
    if (recordFocusSessionResult(mode, isCorrect, mistakeLabel)) return;
    const sessionMode = mode === 'REVIEW' && state.currentReviewItem ? getReviewSourceMode(state.currentReviewItem) : mode;
    const session = getActiveTrainingSession(sessionMode);
    session.hands++;
    if (isCorrect) session.correct++;
    if (!isCorrect && mistakeLabel) session.mistakes[mistakeLabel] = (session.mistakes[mistakeLabel] || 0) + 1;

    if (!state.monetization) state.monetization = getDefaultMonetization();
    state.monetization.answeredHandsSinceAd++;

    if (session.hands >= session.targetHands) {
        session.completed = true;
        state.monetization.completedSessionsSinceAd++;
        unlockAchievement('weekly_review_ready', 'Session review ready');
        renderSessionSummary(session);
        state.trainingSession = createTrainingSession(sessionMode);
    }
}

function getPersonalizedDashboardModel() {
    const t = I18N[state.lang] || I18N.en;
    const plan = getCurrentTrainingPlan();
    const profile = state.assessment && state.assessment.skillDimensions ? state.assessment.skillDimensions : {};
    const weekly = getWeeklySummary();
    const reviewCount = state.mistakeReplay && state.mistakeReplay.queue ? state.mistakeReplay.queue.length : 0;
    const daily = state.gamification && state.gamification.dailyActivity ? state.gamification.dailyActivity[getDateKey()] : null;
    const focusTarget = plan.dailyDrill || (plan.adaptivePriorities && plan.adaptivePriorities[0]) || 'RFI';
    return {
        firstRun: !state.assessment && !state.assessmentSkipped && state.stats.totalHands === 0,
        dailyDrill: focusTarget,
        dailyLabel: getModeLabel(focusTarget, t),
        reviewCount,
        topLeak: plan.topLeaks && plan.topLeaks[0] ? plan.topLeaks[0] : (t.assessmentLeakRfi || 'Opening range discipline'),
        baselineLevel: profile.baselineLevel || (state.assessmentSkipped ? (t.assessmentSkipped || 'Assessment skipped') : (t.skillBaselineEmpty || 'Unrated')),
        weakestDimension: profile.weakestDimension ? getModeLabel(profile.weakestDimension, t) : getModeLabel(plan.dailyDrill || 'RFI', t),
        weekly,
        dailyHands: daily ? daily.hands : 0
    };
}

window.renderPersonalizedDashboard = function () {
    const el = document.getElementById('personalized-dashboard');
    if (!el) return;
    const t = I18N[state.lang] || I18N.en;
    const model = getPersonalizedDashboardModel();
    const firstRunClass = model.firstRun ? ' is-first-run' : '';
    const focusMix = `70% ${model.dailyLabel} + 30% ${t.modeReviewMistakesShort || 'Review'}`;
    el.className = `personalized-dashboard glassmorphism${firstRunClass}`;
    el.innerHTML = `
        <div class="personalized-main">
            <div>
                <span class="panel-kicker">${model.firstRun ? (t.quickStartKicker || 'Quick Start') : (t.todayDrillKicker || "Today's Training")}</span>
                <h2>${model.firstRun ? (t.quickStartTitle || 'Quick Diagnostic') : (t.focusSessionTitle || 'Focus Session')}</h2>
                <p>${model.firstRun ? (t.quickStartBody || 'Start with a short diagnostic to build your first training plan.') : escapeHtml((t.focusSessionMix || '{mix} based on {leak}.').replace('{mix}', focusMix).replace('{leak}', model.topLeak))}</p>
            </div>
            <div class="personalized-actions">
                <button class="btn-range-action" type="button" onclick="${model.firstRun ? 'startQuickDiagnostic()' : 'startFocusSession()'}">${model.firstRun ? (t.quickStartCta || 'Start Quick Diagnostic') : (t.focusSessionCta || 'Start Focus Session')}</button>
                <button class="btn-range-action btn-range-clear" type="button" onclick="startMistakeReplay()" ${model.reviewCount ? '' : 'disabled'}>${(t.reviewMistakesCta || 'Review Mistakes ({count})').replace('{count}', model.reviewCount)}</button>
            </div>
        </div>
        <div class="personalized-metrics">
            <div><span>${t.skillBaseline || 'Baseline'}</span><strong>${escapeHtml(model.baselineLevel)}</strong></div>
            <div><span>${t.skillWeakest || 'Focus'}</span><strong>${escapeHtml(model.weakestDimension)}</strong></div>
            <div><span>${t.modeReviewMistakesShort || 'Review'}</span><strong>${model.reviewCount}</strong></div>
            <div><span>${t.weeklyHands || 'This week'}</span><strong>${model.weekly.hands}</strong></div>
        </div>
    `;
};

function setHiddenById(id, hidden = true) {
    const el = document.getElementById(id);
    if (el && el.classList) el.classList.toggle('hidden', !!hidden);
}

function isPlanTrainingActive() {
    return state.activeTab === 'plan'
        && (!!(state.focusSession && state.focusSession.active) || state.currentMode === 'REVIEW');
}

function syncAppTabPanels() {
    const activeTab = ['practice', 'plan', 'progress'].includes(state.activeTab) ? state.activeTab : 'practice';
    state.activeTab = activeTab;
    const showPlanTraining = isPlanTrainingActive();
    const practicePanel = document.getElementById('practice-panel');

    setHiddenById('practice-panel', activeTab !== 'practice' && !showPlanTraining);
    setHiddenById('plan-panel', activeTab !== 'plan');
    setHiddenById('progress-panel', activeTab !== 'progress');
    setHiddenById('personalized-dashboard', activeTab !== 'plan');
    setHiddenById('header-mode-control', activeTab !== 'practice');
    if (practicePanel && practicePanel.classList) {
        practicePanel.classList.toggle('plan-training-active', showPlanTraining);
    }
    ['practice', 'plan', 'progress'].forEach(item => {
        const tabEl = document.getElementById(`tab-${item}`);
        if (tabEl && tabEl.classList) tabEl.classList.toggle('active', item === activeTab);
    });
}

function getFirstRunAnswers() {
    const fieldMap = {
        experience: 'beginner',
        gameType: 'cash',
        stackFocus: 'deep',
        confidence: 'medium'
    };
    return Object.fromEntries(Object.entries(fieldMap).map(([field, fallback]) => {
        const kebab = field.replace(/[A-Z]/g, ch => `-${ch.toLowerCase()}`);
        const el = document.getElementById(`first-run-${kebab}-select`);
        return [field, el && el.value ? el.value : fallback];
    }));
}

function populateFirstRunForm(answers = {}) {
    ASSESSMENT_FIELDS.forEach(field => {
        const kebab = field.replace(/[A-Z]/g, ch => `-${ch.toLowerCase()}`);
        const el = document.getElementById(`first-run-${kebab}-select`);
        if (el && answers[field]) el.value = answers[field];
    });
}

function syncLanguageControls() {
    const option = getLanguageOption(state.lang);
    const t = I18N[state.lang] || I18N.en;
    const label = t.languageLabel || 'Language';
    const select = document.getElementById('language-select');
    if (select) {
        select.setAttribute('aria-label', `${label}: ${option.label}`);
        select.title = `${label}: ${option.label}`;
        const hasCompactOptions = select.options
            && select.options.length === LANGUAGE_OPTIONS.length
            && LANGUAGE_OPTIONS.every((item, index) => {
                const selectOption = select.options[index];
                return selectOption
                    && selectOption.value === item.code
                    && selectOption.textContent === (item.shortLabel || item.label);
            });
        if (!hasCompactOptions) {
            select.innerHTML = LANGUAGE_OPTIONS
                .map(item => {
                    const visibleLabel = item.shortLabel || item.label;
                    return `<option value="${escapeHtml(item.code)}" title="${escapeHtml(item.label)}">${escapeHtml(visibleLabel)}</option>`;
                })
                .join('');
        }
        select.value = option.code;
    }
}

function shouldShowFirstRunFlow() {
    return !state.firstRunCompleted
        && !state.assessmentSkipped
        && (state.firstRunStage === 'profile' || (!state.assessment && state.stats.totalHands === 0));
}

function renderFirstRunFlow() {
    const el = document.getElementById('first-run-flow');
    if (!el) return;
    const t = I18N[state.lang] || I18N.en;
    const answers = state.assessment && state.assessment.answers ? state.assessment.answers : getFirstRunAnswers();
    const quickStartBody = (t.quickStartBodyWithCount || '{body} {count} {hands}.')
        .replace('{body}', t.quickStartBody || 'Start with a short diagnostic to build your first training plan.')
        .replace('{count}', QUICK_DIAGNOSTIC_HANDS)
        .replace('{hands}', t.statsHands || 'hands');
    if (state.firstRunStage === 'profile' && state.assessment && state.assessment.skillDimensions) {
        const profile = state.assessment.skillDimensions;
        const plan = state.assessment.recommendedPlan || {};
        el.innerHTML = `
            <div class="first-run-window">
                <div class="first-run-window-header">
                    <div>
                        <span class="panel-kicker">${t.skillBaseline || 'Baseline'}</span>
                        <h2 id="first-run-title">Skill profile</h2>
                    </div>
                </div>
                <div class="assessment-profile-grid">
                    <div><span>${t.skillBaseline || 'Baseline'}</span><strong>${escapeHtml(profile.baselineLevel || 'Unrated')}</strong></div>
                    <div><span>${t.skillWeakest || 'Weakest'}</span><strong>${escapeHtml(getModeLabel(profile.weakestDimension || plan.dailyDrill || 'RFI', t))}</strong></div>
                    <div><span>${t.personalizedNextDrill || 'Next drill'}</span><strong>${escapeHtml(getModeLabel(plan.dailyDrill || 'RFI', t))}</strong></div>
                </div>
                <div class="drill-form-actions">
                    <button class="btn-range-action" type="button" onclick="startFirstTrainingFromProfile()">${t.focusSessionCta || 'Start Focus Session'}</button>
                </div>
            </div>
        `;
        syncLanguageControls();
        return;
    }

    el.innerHTML = `
        <div class="first-run-window">
            <div class="first-run-window-header">
                <div>
                    <span class="panel-kicker">${t.quickStartKicker || 'Quick Start'}</span>
                    <h2 id="first-run-title">${t.quickStartTitle || 'Quick Diagnostic'}</h2>
                </div>
            </div>
            <p>${escapeHtml(quickStartBody)}</p>
            <div class="assessment-form-grid">
                <label><span>${t.assessmentExperienceLabel || 'Experience'}</span><select id="first-run-experience-select" class="mode-select"><option value="beginner">${t.assessmentExperienceBeginner || 'Beginner'}</option><option value="intermediate">${t.assessmentExperienceIntermediate || 'Intermediate'}</option><option value="advanced">${t.assessmentExperienceAdvanced || 'Advanced'}</option></select></label>
                <label><span>${t.assessmentGameTypeLabel || 'Main game'}</span><select id="first-run-game-type-select" class="mode-select"><option value="cash">${t.assessmentGameCash || 'Cash'}</option><option value="tournament">${t.assessmentGameTournament || 'Tournament'}</option><option value="mixed">${t.assessmentGameMixed || 'Mixed'}</option></select></label>
                <label><span>${t.assessmentStackFocusLabel || 'Stack focus'}</span><select id="first-run-stack-focus-select" class="mode-select"><option value="deep">${t.assessmentStackDeep || 'Deep / 80bb+'}</option><option value="medium">${t.assessmentStackMedium || 'Medium / 25-80bb'}</option><option value="short">${t.assessmentStackShort || 'Short / 15bb or less'}</option></select></label>
                <label><span>${t.assessmentConfidenceLabel || 'Confidence'}</span><select id="first-run-confidence-select" class="mode-select"><option value="low">${t.assessmentConfidenceLow || 'Low'}</option><option value="medium">${t.assessmentConfidenceMedium || 'Medium'}</option><option value="high">${t.assessmentConfidenceHigh || 'High'}</option></select></label>
            </div>
            <div class="drill-form-actions">
                <button class="btn-range-action" type="button" onclick="startFirstRunDiagnostic()">${t.diagnosticStart || 'Start Diagnostic'}</button>
                <button class="btn-range-action btn-range-clear" type="button" onclick="skipFirstRunFlow()">${t.firstRunSkip || t.assessmentSkip || 'Skip'}</button>
            </div>
        </div>
    `;
    populateFirstRunForm(answers);
    syncLanguageControls();
}

function getStatRows(collection, labelForKey, order = null) {
    const entries = order
        ? order.map(key => [key, (collection || {})[key]]).filter(([, data]) => data && data.hands)
        : Object.entries(collection || {}).filter(([, data]) => data && data.hands);
    return entries
        .map(([key, data]) => ({
            key,
            label: labelForKey(key),
            hands: data.hands || 0,
            accuracy: pct(data.correct || 0, data.hands || 0)
        }))
        .sort((a, b) => b.hands - a.hands || a.accuracy - b.accuracy);
}

function renderReviewTable(rows, t) {
    if (!rows.length) return `<p class="review-empty">${t.reviewNoBreakdownData || 'No data yet.'}</p>`;
    return `
        <table class="review-table">
            <thead>
                <tr>
                    <th>${t.reviewTableDimension || 'Dimension'}</th>
                    <th>${t.lifetimeHands || 'Hands'}</th>
                    <th>${t.statsAccuracy || 'Accuracy'}</th>
                </tr>
            </thead>
            <tbody>
                ${rows.map(row => `
                    <tr>
                        <td>${escapeHtml(row.label)}</td>
                        <td>${row.hands}</td>
                        <td>${row.accuracy}%</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function getMistakeSpotLabel(item, t = I18N[state.lang] || I18N.en) {
    const parts = [
        getModeLabel(getReviewSourceMode(item), t),
        item && item.position,
        item && item.stack ? `${item.stack}bb` : ''
    ].filter(Boolean);
    return parts.join(' · ');
}

function getRankedMistakeSpots(t = I18N[state.lang] || I18N.en) {
    const sourceItems = state.mistakeReplay && state.mistakeReplay.queue && state.mistakeReplay.queue.length
        ? state.mistakeReplay.queue
        : (state.handHistory || []).filter(item => !item.correct);
    const groups = {};
    sourceItems.forEach(item => {
        const label = getMistakeSpotLabel(item, t);
        if (!label) return;
        if (!groups[label]) groups[label] = { label, count: 0, combos: new Set(), action: item.correctAction || '' };
        groups[label].count++;
        if (item.combo) groups[label].combos.add(item.combo);
        if (item.correctAction) groups[label].action = item.correctAction;
    });
    return Object.values(groups)
        .map(item => ({
            label: item.label,
            count: item.count,
            combos: [...item.combos].slice(0, 3),
            action: item.action
        }))
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
        .slice(0, 3);
}

function getReviewWeaknessModel(t, mistakeSpots) {
    if (mistakeSpots.length) {
        return {
            label: mistakeSpots[0].label,
            detail: `${mistakeSpots[0].count}x`
        };
    }
    const spotRows = getStatRows(state.stats.bySpotType, key => getSpotTypeLabel(key, t))
        .filter(row => row.hands >= 3)
        .sort((a, b) => a.accuracy - b.accuracy || b.hands - a.hands);
    if (spotRows.length) {
        return {
            label: spotRows[0].label,
            detail: `${spotRows[0].accuracy}% · ${spotRows[0].hands} ${t.statsHands || 'hands'}`
        };
    }
    const profile = state.assessment && state.assessment.skillDimensions ? state.assessment.skillDimensions : {};
    if (profile.weakestDimension) {
        return {
            label: getModeLabel(profile.weakestDimension, t),
            detail: t.skillWeakest || 'Weakest'
        };
    }
    return {
        label: t.skillBaselineEmpty || 'Unrated',
        detail: t.reviewWeaknessEmpty || 'Train a few hands to identify a weakness.'
    };
}

function getReviewTrendModel(weekly, t) {
    if (!weekly.previousHands) {
        return {
            value: `${weekly.accuracy || 0}%`,
            detail: t.reviewImprovementEmpty || 'No prior week trend yet.'
        };
    }
    if (weekly.trend > 0) {
        return {
            value: `+${weekly.trend}%`,
            detail: (t.reviewTrendUp || '+{trend}% vs previous week').replace('{trend}', weekly.trend)
        };
    }
    if (weekly.trend < 0) {
        return {
            value: `${weekly.trend}%`,
            detail: (t.reviewTrendDown || '{trend}% vs previous week').replace('{trend}', weekly.trend)
        };
    }
    return {
        value: '0%',
        detail: t.reviewTrendFlat || 'Flat vs previous week'
    };
}

function renderProgressDashboard() {
    const el = document.getElementById('progress-dashboard');
    if (!el) return;
    const t = I18N[state.lang] || I18N.en;
    const profile = state.assessment && state.assessment.skillDimensions ? state.assessment.skillDimensions : {};
    const weekly = getWeeklySummary();
    const mistakeSpots = getRankedMistakeSpots(t);
    const weakness = getReviewWeaknessModel(t, mistakeSpots);
    const trend = getReviewTrendModel(weekly, t);
    const positionRows = getStatRows(state.stats.byPosition, key => key, POSITIONS);
    const stackRows = getStatRows(state.stats.byStackDepth, key => getStackDepthLabel(key, t), ['short', 'medium', 'deep']);
    const spotRows = getStatRows(state.stats.bySpotType, key => getSpotTypeLabel(key, t));
    const mistakeItems = mistakeSpots.length
        ? mistakeSpots.map(item => `
            <li>
                <strong>${escapeHtml(item.label)}</strong>
                ${item.count}x${item.combos.length ? ` · ${escapeHtml(item.combos.join(', '))}` : ''}${item.action ? ` · ${escapeHtml(getCoreActionLabel(item.action, t))}` : ''}
            </li>
        `).join('')
        : `<li>${t.reviewNoMistakes || 'No mistake spots queued.'}</li>`;
    el.innerHTML = `
        <span class="panel-kicker">${t.appTabProgress || 'Review'}</span>
        <h2>${escapeHtml(profile.baselineLevel || t.skillBaselineEmpty || 'Unrated')}</h2>
        <div class="review-summary-grid">
            <div class="review-insight">
                <span>${t.reviewTodayWeakness || "Today's weakness"}</span>
                <strong>${escapeHtml(weakness.label)}</strong>
                <p>${escapeHtml(weakness.detail)}</p>
            </div>
            <div class="review-insight">
                <span>${t.reviewRecentImprovement || 'Recent improvement'}</span>
                <strong>${escapeHtml(trend.value)}</strong>
                <p>${escapeHtml(trend.detail)}</p>
            </div>
            <div class="review-insight">
                <span>${t.statsAccuracy || 'Accuracy'}</span>
                <strong>${profile.overallAccuracy || pct(state.stats.totalCorrect, state.stats.totalHands)}%</strong>
                <p>${state.stats.totalHands || 0} ${t.statsHands || 'hands'} · ${weekly.hands || 0} ${t.weeklyHands || 'this week'}</p>
            </div>
        </div>
        <h3>${t.reviewTopMistakeSpots || 'Most missed spots'}</h3>
        <ul class="review-mistake-list">${mistakeItems}</ul>
        <div class="review-breakdown-grid">
            <section class="review-breakdown">
                <h3>${t.reviewPositionPerformance || 'By position'}</h3>
                ${renderReviewTable(positionRows, t)}
            </section>
            <section class="review-breakdown">
                <h3>${t.reviewStackPerformance || 'By stack depth'}</h3>
                ${renderReviewTable(stackRows, t)}
            </section>
            <section class="review-breakdown">
                <h3>${t.reviewSpotPerformance || 'By spot type'}</h3>
                ${renderReviewTable(spotRows, t)}
            </section>
        </div>
    `;
}

window.renderAppShell = function () {
    const firstRun = shouldShowFirstRunFlow();
    setHiddenById('first-run-flow', !firstRun);
    setHiddenById('app-header', false);
    if (document.body && document.body.classList) document.body.classList.toggle('is-first-run', firstRun);
    if (firstRun) {
        renderFirstRunFlow();
        state.activeTab = 'practice';
        setHiddenById('practice-panel', false);
        setHiddenById('plan-panel', true);
        setHiddenById('progress-panel', true);
        setHiddenById('personalized-dashboard', true);
        setHiddenById('practice-mode-panel', false);
        setHiddenById('header-mode-control', false);
        syncLanguageControls();
        return;
    }
    setHiddenById('first-run-flow', true);
    setHiddenById('app-header', false);
    if (document.body && document.body.classList) document.body.classList.remove('is-first-run');
    window.setActiveTab(state.activeTab || 'practice');
    syncLanguageControls();
};

window.setActiveTab = function (tab) {
    state.activeTab = ['practice', 'plan', 'progress'].includes(tab) ? tab : 'practice';
    setHiddenById('practice-mode-panel', !!(state.diagnosticSession && state.diagnosticSession.active));
    syncAppTabPanels();
    if (state.activeTab === 'plan') renderPersonalizedDashboard();
    if (state.activeTab === 'progress') renderProgressDashboard();
    saveToStorage();
};

window.startFirstRunDiagnostic = function () {
    const answers = getFirstRunAnswers();
    saveAssessmentProfile({
        status: 'in_progress',
        answers,
        recommendedPlan: getAssessmentPlan(answers)
    });
    state.firstRunCompleted = false;
    state.firstRunStage = 'diagnostic';
    state.activeTab = 'practice';
    state.diagnosticSession = createDiagnosticSession(QUICK_DIAGNOSTIC_HANDS, true);
    closeAssessmentModal();
    window.renderAppShell();
    startTurn();
};

window.skipFirstRunFlow = function () {
    skipAssessment();
    state.firstRunCompleted = true;
    state.firstRunStage = 'completed';
    state.activeTab = 'practice';
    state.diagnosticSession = null;
    state.focusSession = null;
    saveToStorage();
    window.renderAppShell();
    const selector = document.getElementById('mode-selector');
    if (selector && selector.value === 'REVIEW') selector.value = 'RFI';
    if (state.currentMode === 'REVIEW') changeMode('RFI', true);
    renderPersonalizedDashboard();
};

window.startFirstTrainingFromProfile = function () {
    state.firstRunCompleted = true;
    state.firstRunStage = 'completed';
    state.activeTab = 'practice';
    saveToStorage();
    window.renderAppShell();
    window.startFocusSession({ activeTab: 'practice' });
};

window.startFocusSession = function (options = {}) {
    state.focusSession = createFocusSession(TRAINING_SESSION_HANDS);
    const nextTab = options.activeTab || 'plan';
    state.activeTab = nextTab;
    if (typeof window.setActiveTab === 'function') window.setActiveTab(nextTab);
    startFocusSessionTurn();
    syncAppTabPanels();
};

window.startTodayDrill = function () {
    window.startFocusSession();
};

window.closeSessionSummary = function () {
    const modal = document.getElementById('session-summary-modal');
    if (modal) modal.classList.add('hidden');
    renderPersonalizedDashboard();
};

window.recordDonateIntent = function () {
    if (!state.monetization) state.monetization = getDefaultMonetization();
    state.monetization.donationIntent = true;
    saveToStorage();
    if (typeof window.open === 'function') {
        window.open(DONATE_URL, '_blank', 'noopener,noreferrer');
    }
    showToast((I18N[state.lang] || I18N.en).donateThanks || 'Thanks for supporting Preflop.', 'success');
};

function readSupportFeedbackForm() {
    const emailInput = document.getElementById('support-feedback-email');
    const categoryInput = document.getElementById('support-feedback-category');
    const messageInput = document.getElementById('support-feedback-input');
    const gotchaInput = document.getElementById('support-feedback-gotcha');
    const allowedCategories = new Set(['bug', 'feature', 'strategy', 'other']);
    const category = categoryInput && allowedCategories.has(categoryInput.value) ? categoryInput.value : 'other';

    return {
        email: emailInput && typeof emailInput.value === 'string' ? emailInput.value.trim() : '',
        category,
        message: messageInput && typeof messageInput.value === 'string' ? messageInput.value.trim() : '',
        gotcha: gotchaInput && typeof gotchaInput.value === 'string' ? gotchaInput.value.trim() : '',
        emailInput,
        messageInput,
        categoryInput,
        gotchaInput
    };
}

function resetSupportFeedbackForm(formData) {
    if (formData.emailInput) formData.emailInput.value = '';
    if (formData.messageInput) formData.messageInput.value = '';
    if (formData.categoryInput) formData.categoryInput.value = 'bug';
    if (formData.gotchaInput) formData.gotchaInput.value = '';
}

function buildSupportFeedbackPayload(feedback) {
    const currentCombo = state.currentHand ? getComboName(state.currentHand) : '';
    return {
        _subject: 'Poker Preflop Trainer Feedback',
        email: feedback.email,
        category: feedback.category,
        message: feedback.message,
        language: state.lang,
        activeTab: state.activeTab,
        currentMode: state.currentMode,
        currentPosition: state.currentPosition || '',
        currentStack: state.currentStack || '',
        currentHand: currentCombo,
        totalHands: state.stats ? state.stats.totalHands || 0 : 0,
        sentAt: new Date().toISOString()
    };
}

window.submitSupportFeedback = async function (event) {
    if (event && typeof event.preventDefault === 'function') event.preventDefault();
    const t = I18N[state.lang] || I18N.en;
    const feedback = readSupportFeedbackForm();
    if (feedback.gotcha) {
        resetSupportFeedbackForm(feedback);
        return;
    }
    if (!feedback.message) {
        showToast(t.supportFeedbackEmpty || 'Write feedback before sending.', 'info');
        if (feedback.messageInput && typeof feedback.messageInput.focus === 'function') feedback.messageInput.focus();
        return;
    }
    const submitButton = event && event.submitter ? event.submitter : null;
    if (submitButton) submitButton.disabled = true;
    try {
        if (typeof fetch !== 'function') throw new Error('Feedback service is unavailable in this browser.');
        const response = await fetch(SUPPORT_FEEDBACK_ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buildSupportFeedbackPayload(feedback))
        });
        if (!response || !response.ok) throw new Error(`Feedback service returned ${response ? response.status : 'no response'}.`);
        resetSupportFeedbackForm(feedback);
        showToast(t.supportFeedbackThanks || 'Feedback sent. Thanks for helping improve Preflop.', 'success');
    } catch (error) {
        console.warn('Could not submit feedback', error);
        showToast(t.supportFeedbackError || 'Could not send feedback. Please try again when you are online.', 'error');
    } finally {
        if (submitButton) submitButton.disabled = false;
    }
};

window.openViewportAdModal = openViewportAdModal;

window.closeAdModal = function () {
    if (!state.monetization) state.monetization = getDefaultMonetization();
    state.monetization.lastDismissedAdAt = new Date().toISOString();
    saveToStorage();
    const modal = document.getElementById('ad-modal');
    if (modal) modal.classList.add('hidden');
};

window.dismissAdForToday = window.closeAdModal;

window.activateLifetimeAdFree = function () {
    if (!state.monetization) state.monetization = getDefaultMonetization();
    state.monetization.lifetimeAdFree = true;
    saveToStorage();
    showToast((I18N[state.lang] || I18N.en).adFreeActivated || 'Ad-free preference saved.', 'success');
};

// ============================================================
// GAME LOGIC — EVALUATE
// ============================================================
function evaluateAction(hand, position) {
    if (state.diagnosticSession && state.diagnosticSession.active) {
        const spot = state.diagnosticSession.currentSpot;
        if (spot && spot.type === 'FACING_3BET') return evaluateDiagnosticFacing3Bet(hand);
    }
    if (state.currentMode === 'REVIEW' && state.currentReviewItem) {
        return {
            action: state.currentReviewItem.correctAction,
            explanation: state.currentReviewItem.explanation || `${state.currentReviewItem.combo}: ${state.currentReviewItem.correctAction}`
        };
    }
    if (state.currentMode === 'RFI') return evaluateRFI(hand, position);
    if (state.currentMode === 'PUSH_FOLD') return evaluatePushFold(hand, position);
    if (state.currentMode === 'DEFEND') return evaluateDefend(hand);
    if (state.currentMode === 'ALL_STREET') return evaluateAllStreet(hand, getCurrentAllStreetScenario());
    if (state.currentMode === 'CUSTOM') {
        const drill = getActiveCustomDrill();
        if (drill) return evaluateCustomDrill(hand, drill);
        return evaluateCustom(hand, state.currentCustomRangeName);
    }
}

function evaluateCustom(hand, rangeName) {
    const combo = getComboName(hand);
    const range = state.customRanges[rangeName];
    if (!range) return { action: 'Fold', explanation: 'No range selected.' };

    if (range.raise && range.raise.includes(combo)) {
        return { action: 'Raise', explanation: `Custom Range [${rangeName}]: ${combo} is a Raise.` };
    }
    if (range.call && range.call.includes(combo)) {
        return { action: 'Call', explanation: `Custom Range [${rangeName}]: ${combo} is a Call.` };
    }
    return { action: 'Fold', explanation: `Custom Range [${rangeName}]: ${combo} is a Fold.` };
}

function evaluateCustomDrill(hand, drill) {
    const combo = getComboName(hand);
    const t = I18N[state.lang] || I18N.en;

    let action = 'Fold';
    if (drill.type === DRILL_TYPES.RFI_FOCUS) {
        const openRange = drill.ranges && drill.ranges.open;
        const builtIn = RFI_RANGES[state.currentPosition] || new Set();
        const shouldRaise = openRange ? rangeCodeHasPlayableCombo(openRange, combo) : builtIn.has(combo);
        action = shouldRaise ? 'Raise' : 'Fold';
    } else if (drill.type === DRILL_TYPES.DEFENSE_VS_OPEN || drill.type === DRILL_TYPES.FACING_3BET) {
        if (rangeCodeHasPlayableCombo(drill.ranges.raise, combo)) {
            action = drill.allowedActions && drill.allowedActions.includes('All-In') && !drill.allowedActions.includes('Raise') ? 'All-In' : 'Raise';
        } else if (rangeCodeHasPlayableCombo(drill.ranges.call, combo)) {
            action = 'Call';
        }
    } else if (drill.type === DRILL_TYPES.PUSH_FOLD) {
        const shoveRange = drill.ranges && drill.ranges.shove;
        const stackRanges = PUSH_RANGES_BY_STACK[String(drill.stackBb)] || PUSH_RANGES_BY_STACK[state.currentStack] || PUSH_10BB;
        const builtIn = stackRanges[state.currentPosition] || new Set();
        const shouldShove = shoveRange ? rangeCodeHasPlayableCombo(shoveRange, combo) : builtIn.has(combo);
        action = shouldShove ? 'All-In' : 'Fold';
    } else if (drill.type === DRILL_TYPES.ALL_STREET) {
        return evaluateAllStreet(hand, getActiveAllStreetScenario());
    } else {
        return { action: 'Fold', explanation: t.evalDrillUnsupported || 'This drill type is not trainable yet.' };
    }

    const note = drill.note ? ` ${drill.note}` : '';
    const explanation = (t.evalCustomDrill || '{name}: {combo} is {action}.{note}')
        .replace('{name}', drill.name)
        .replace('{combo}', combo)
        .replace('{action}', action)
        .replace('{note}', note);
    return { action, explanation };
}

function evaluateAllStreet(hand, scenario = getCurrentAllStreetScenario()) {
    const combo = getComboName(hand);
    if (!scenario) return { action: 'Fold', explanation: `${combo}: no all-street scenario is active.` };

    let action = scenario.defaultAction || 'Fold';
    const hasRangeCodes = scenario.ranges
        && typeof scenario.ranges === 'object'
        && (scenario.ranges.raise || scenario.ranges.call);
    if (hasRangeCodes) {
        if (rangeCodeHasPlayableCombo(scenario.ranges.raise, combo)) {
            action = 'Raise';
        } else if (rangeCodeHasPlayableCombo(scenario.ranges.call, combo)) {
            action = 'Call';
        }
    } else {
        const comboActions = scenario.comboActions || {};
        for (const [candidateAction, combos] of Object.entries(comboActions)) {
            if (Array.isArray(combos) && combos.includes(combo)) {
                action = candidateAction;
                break;
            }
        }
    }

    const label = getAllStreetActionLabel(action, scenario);
    const t = I18N[state.lang] || I18N.en;
    const texture = getLocalizedBoardTextureLabels(scenario, t).join(', ');
    const title = getAllStreetScenarioTitle(scenario, t);
    const explanation = getAllStreetScenarioExplanation(scenario, t);
    return {
        action,
        explanation: `${title}: ${combo} -> ${label}. ${t.postflopBoardLabel || 'Board'} ${scenario.boardCards.join(' ')} (${texture}); ${t.postflopPotLabel || 'Pot'} ${scenario.potBb}bb, SPR ${scenario.spr}. ${explanation}`
    };
}

function evaluateRFI(hand, position) {
    const combo = getComboName(hand);
    const range = RFI_RANGES[position];
    const isRaise = range && range.has(combo);
    if (isRaise) {
        return {
            action: 'Raise', explanation: position === 'UTG'
                ? I18N[state.lang].evalRfiUtgRaise(combo)
                : I18N[state.lang].evalRfiRaise(position, combo)
        };
    }
    return {
        action: 'Fold', explanation: position === 'UTG'
            ? I18N[state.lang].evalRfiUtgFold(combo)
            : I18N[state.lang].evalRfiFold(position, combo)
    };
}

function evaluatePushFold(hand, position) {
    const combo = getComboName(hand);
    const ranges = PUSH_RANGES_BY_STACK[state.currentStack] || PUSH_10BB;
    const range = ranges[position];
    if (range && range.has(combo)) return { action: 'All-In', explanation: I18N[state.lang].evalPush(position, combo, state.currentStack) };
    return { action: 'Fold', explanation: I18N[state.lang].evalPushFold(position, combo, state.currentStack) };
}

function evaluateDefend(hand) {
    const combo = getComboName(hand);
    const sc = DEFEND_SCENARIOS[state.currentDefendScenario];
    if (!sc) return { action: 'Fold', explanation: '' };
    if (sc.THREE_BET.has(combo)) return { action: 'Raise', explanation: I18N[state.lang].evalDefendRaise(combo, sc.villain, sc.hero) };
    if (sc.CALL && sc.CALL.has(combo)) return { action: 'Call', explanation: I18N[state.lang].evalDefendCall(combo, sc.villain, sc.hero) };
    return { action: 'Fold', explanation: I18N[state.lang].evalDefendFold(combo, sc.villain, sc.hero) };
}

// ============================================================
// DOM ELEMENTS (initialized on load)
// ============================================================
let feedbackEl, feedbackTitleEl, feedbackMsgEl, feedbackIconEl, scoreEl, streakEl, lifetimeHandsEl;
let holeCardsEl, boardCardsEl, postflopControlPanelEl, tableContextOverlayEl, heroPositionEl, scenarioTextEl, chartModalEl, infoModalEl;
let coachContentEl, coachBadgeEl, btnFoldEl, btnCallEl, btnRaiseEl, btnAllInEl, btnRangeEditorEl;
let accuracyHudEl;

function initElements() {
    feedbackEl = document.getElementById('feedback');
    feedbackTitleEl = document.getElementById('feedback-title');
    feedbackMsgEl = document.getElementById('feedback-message');
    feedbackIconEl = document.getElementById('feedback-icon');
    scoreEl = document.getElementById('score');
    streakEl = document.getElementById('streak');
    lifetimeHandsEl = document.getElementById('lifetime-hands');
    holeCardsEl = document.getElementById('hole-cards');
    boardCardsEl = document.getElementById('board-cards');
    postflopControlPanelEl = document.getElementById('postflop-control-panel');
    tableContextOverlayEl = document.getElementById('table-context-overlay');
    heroPositionEl = document.getElementById('hero-position');
    scenarioTextEl = document.getElementById('scenario-text');
    chartModalEl = document.getElementById('chart-modal');
    infoModalEl = document.getElementById('info-modal');
    coachContentEl = document.getElementById('coach-content');
    coachBadgeEl = document.getElementById('coach-badge');
    btnFoldEl = document.getElementById('btn-fold');
    btnCallEl = document.getElementById('btn-call');
    btnRaiseEl = document.getElementById('btn-raise');
    btnAllInEl = document.getElementById('btn-allin');
    btnRangeEditorEl = document.getElementById('btn-range-editor');
    accuracyHudEl = document.getElementById('accuracy-hud');
}

function updateScenarioUI() {
    if (!state.currentHand) return;
    const t = I18N[state.lang] || I18N.en;
    const pos = t.position[state.currentPosition] || state.currentPosition;
    let tags = [];
    let badge = '';
    let tableModel = {};
    const openText = t.scenarioTagOpen || 'open';
    const firstInText = t.scenarioTagFirstIn || 'First in';
    const reviewText = t.scenarioTagReview || t.modeReviewMistakesShort || 'Review';
    const buildHeadsUpModel = (hero, villain = '') => ({
        positions: [
            hero ? { role: 'hero', icon: '', label: getRolePositionLabel('hero', hero, t), aria: getRolePositionLabel('hero', hero, t) } : null,
            villain ? { role: 'villain', icon: '', label: getRolePositionLabel('villain', villain, t), aria: getRolePositionLabel('villain', villain, t) } : null
        ].filter(Boolean)
    });
    renderBoardCards([]);
    renderPostflopControlPanel(null);

    if (state.diagnosticSession && state.diagnosticSession.active && state.diagnosticSession.currentSpot && state.diagnosticSession.currentSpot.type === 'FACING_3BET') {
        tags = [`CO ${openText} 2.5bb`, 'BTN 3-Bet 9bb', t.drillTypeFacing3Bet || 'Facing 3-Bet'];
        badge = 'CO vs BTN';
        tableModel = buildHeadsUpModel('CO', 'BTN');
    } else if (state.currentMode === 'REVIEW' && state.currentReviewItem) {
        const sourceMode = getReviewSourceMode(state.currentReviewItem);
        const sourceLabel = getModeLabel(sourceMode, t);
        const position = state.currentReviewItem.position || state.currentPosition || '';
        const stackTag = state.currentReviewItem.stack ? `${state.currentReviewItem.stack}bb` : '';
        tags = [reviewText, sourceLabel, position, stackTag].filter(Boolean);
        badge = position || sourceLabel;
        tableModel = buildHeadsUpModel(position);
    } else if (state.currentMode === 'ALL_STREET') {
        const scenario = getCurrentAllStreetScenario();
        renderBoardCards(scenario.boardCards);
        renderPostflopControlPanel(scenario);
        badge = null;
        tableModel = getAllStreetTableModel(scenario, t);
        renderAllStreetScenarioSummary(scenario, t);
        updateAllStreetActionButtons();
    } else if (state.currentMode === 'RFI') {
        tags = [state.currentPosition, firstInText];
        badge = state.currentPosition;
        tableModel = buildHeadsUpModel(state.currentPosition);
    } else if (state.currentMode === 'PUSH_FOLD') {
        tags = [state.currentPosition, t.badgePushFold || 'Push/Fold', `${state.currentStack}bb`];
        badge = state.currentPosition;
        tableModel = buildHeadsUpModel(state.currentPosition);
    } else if (state.currentMode === 'DEFEND') {
        const sc = DEFEND_SCENARIOS[state.currentDefendScenario];
        tags = [`${sc.villain} ${openText} 2.5bb`, `${sc.hero} vs ${sc.villain}`];
        badge = `${sc.hero} vs ${sc.villain}`;
        tableModel = buildHeadsUpModel(sc.hero, sc.villain);
    } else if (state.currentMode === 'CUSTOM') {
        const drill = getActiveCustomDrill();
        if (drill && drill.type === DRILL_TYPES.ALL_STREET) {
            const scenario = getActiveAllStreetScenario();
            renderBoardCards(scenario.boardCards);
            renderPostflopControlPanel(scenario);
            badge = null;
            tableModel = getAllStreetTableModel(scenario, t);
            renderAllStreetScenarioSummary(scenario, t);
            updateAllStreetActionButtons(scenario);
        } else if (drill && drill.type === DRILL_TYPES.FACING_3BET) {
            const ctx = getCurrentCustomDrillContext(drill);
            const hero = ctx.heroPosition || drill.heroPosition;
            const villain = ctx.villainPosition || drill.villainPosition;
            tags = [
                `${hero} ${openText} ${ctx.openSizeBb || drill.openSizeBb}bb`,
                `${villain} 3-Bet ${ctx.threeBetSizeBb || drill.threeBetSizeBb}bb`
            ];
            badge = `${hero} vs ${villain}`;
            tableModel = buildHeadsUpModel(hero, villain);
        } else if (drill && drill.type === DRILL_TYPES.DEFENSE_VS_OPEN) {
            const ctx = getCurrentCustomDrillContext(drill);
            const hero = ctx.heroPosition || drill.heroPosition;
            const opener = ctx.openerPosition || drill.openerPosition;
            tags = [`${opener} ${openText} ${ctx.openSizeBb || drill.openSizeBb || 2.5}bb`, `${hero} vs ${opener}`];
            badge = `${hero} vs ${opener}`;
            tableModel = buildHeadsUpModel(hero, opener);
        } else if (drill && drill.type === DRILL_TYPES.RFI_FOCUS) {
            tags = [state.currentPosition, firstInText, drill.name || t.badgeCustom || 'Custom'];
            badge = state.currentPosition;
            tableModel = buildHeadsUpModel(state.currentPosition);
        } else if (drill && drill.type === DRILL_TYPES.PUSH_FOLD) {
            tags = [state.currentPosition, t.badgePushFold || 'Push/Fold', `${drill.stackBb || state.currentStack}bb`];
            badge = state.currentPosition;
            tableModel = buildHeadsUpModel(state.currentPosition);
        } else {
            tags = [state.currentPosition || pos, t.badgeCustom || 'Custom'];
            badge = state.currentPosition || pos;
            tableModel = buildHeadsUpModel(state.currentPosition || pos);
        }
    }
    if (!(state.currentMode === 'ALL_STREET'
        || (state.currentMode === 'CUSTOM' && getActiveCustomDrill() && getActiveCustomDrill().type === DRILL_TYPES.ALL_STREET))) {
        renderScenarioTags(tags, badge);
    }
    renderTableContextOverlay(tableModel);
}

function startTurn() {
    feedbackEl.classList.add('hidden');

    // pick position
    const activeCustomDrill = state.currentMode === 'CUSTOM' ? getActiveCustomDrill() : null;
    state.currentCustomDrillContext = activeCustomDrill ? buildCustomDrillTurnContext(activeCustomDrill) : null;
    if (state.diagnosticSession && state.diagnosticSession.active) {
        prepareDiagnosticTurn();
    } else if (state.currentMode === 'REVIEW') {
        const item = getNextMistakeReplayItem();
        state.currentReviewItem = item;
        if (!item) {
            state.currentHand = null;
            holeCardsEl.innerHTML = '<div class="card empty"></div><div class="card empty"></div>';
            scenarioTextEl.innerText = (I18N[state.lang] || I18N.en).reviewEmpty || 'No mistakes ready for review.';
            heroPositionEl.innerText = (I18N[state.lang] || I18N.en).modeReviewMistakesShort || 'Review';
            renderBoardCards([]);
            renderPostflopControlPanel(null);
            renderTableContextOverlay({});
            return;
        }
        state.currentPosition = item.position || 'BTN';
        state.currentStack = item.stack || state.currentStack;
    } else if (state.currentMode === 'DEFEND') {
        const keys = Object.keys(DEFEND_SCENARIOS);
        state.currentDefendScenario = keys[Math.floor(Math.random() * keys.length)];
        const sc = DEFEND_SCENARIOS[state.currentDefendScenario];
        state.currentPosition = sc.hero;
    } else if (state.currentMode === 'ALL_STREET') {
        const scenario = selectNextAllStreetScenario();
        state.currentPosition = scenario.heroPosition || 'BTN';
    } else if (activeCustomDrill && activeCustomDrill.type === DRILL_TYPES.FACING_3BET) {
        state.currentPosition = state.currentCustomDrillContext.heroPosition;
    } else if (activeCustomDrill && activeCustomDrill.type === DRILL_TYPES.DEFENSE_VS_OPEN) {
        state.currentPosition = state.currentCustomDrillContext.heroPosition;
    } else if (activeCustomDrill && activeCustomDrill.type === DRILL_TYPES.ALL_STREET) {
        state.currentPosition = state.currentCustomDrillContext.heroPosition;
    } else if (activeCustomDrill && Array.isArray(activeCustomDrill.heroPositions) && activeCustomDrill.heroPositions.length > 0) {
        const positions = activeCustomDrill.heroPositions;
        state.currentPosition = positions[Math.floor(Math.random() * positions.length)];
    } else {
        const validPos = ['UTG', 'HJ', 'CO', 'BTN', 'SB'];
        state.currentPosition = validPos[Math.floor(Math.random() * validPos.length)];
    }

    const hand = state.currentMode === 'REVIEW' && state.currentReviewItem
        ? comboToHand(state.currentReviewItem.combo)
        : generateHandWeighted();
    state.currentHand = hand;
    if (activeCustomDrill && activeCustomDrill.type === DRILL_TYPES.ALL_STREET
        && state.currentCustomDrillContext
        && state.currentCustomDrillContext.allStreetScenario
        && parseBoardCardCodes(activeCustomDrill.boardCards).length === 0) {
        const scenario = state.currentCustomDrillContext.allStreetScenario;
        const boardPresetKey = resolveAllStreetPreset(activeCustomDrill.boardPreset, ALL_STREET_BOARD_PRESETS, 'NEUTRAL', ALL_STREET_BOARD_PRESET_ALIASES);
        const generatedBoard = generateBoardByTexturePreset(boardPresetKey, scenario.street, getHandCardCodes(hand));
        state.currentCustomDrillContext.allStreetScenario = {
            ...scenario,
            boardCards: generatedBoard.boardCards,
            boardTexture: generatedBoard.boardTexture
        };
    }

    holeCardsEl.innerHTML = renderCard(hand.c1) + renderCard(hand.c2);
    triggerHaptic(20);

    updateScenarioUI();

    const result = evaluateAction(hand, state.currentPosition);
    state.correctAction = result.action;
    state.explanation = result.explanation;
    updateReviewActionButtons();
}

window.handleAction = function (action) {
    if (!state.currentHand) return;
    const wasDiagnosticActive = !!(state.diagnosticSession && state.diagnosticSession.active);
    const isCorrect = action === state.correctAction;
    const combo = getComboName(state.currentHand);

    if (isCorrect) {
        state.score += 10;
        state.streak++;
        feedbackTitleEl.innerText = I18N[state.lang].feedbackCorrect;
        feedbackEl.className = 'feedback success';
        if (feedbackIconEl) feedbackIconEl.innerText = '✅';
        triggerHaptic([30, 50, 30]);
    } else {
        state.score = Math.max(0, state.score - 5);
        if (state.streak >= 3 && state.gamification && state.gamification.streakForgives > 0) {
            state.gamification.streakForgives--;
            unlockAchievement('forgiving_streak', 'Streak protected');
        } else {
            state.streak = 0;
        }
        feedbackTitleEl.innerText = I18N[state.lang].feedbackIncorrect;
        feedbackEl.className = 'feedback error';
        if (feedbackIconEl) feedbackIconEl.innerText = '❌';
        triggerHaptic(200);
    }

    feedbackMsgEl.innerHTML = `${I18N[state.lang].feedbackDetail(getFeedbackActionLabel(action), getFeedbackActionLabel(state.correctAction))}<br><br>${state.explanation}`;
    linkGlossaryTerms(feedbackMsgEl);
    if (scoreEl) scoreEl.innerText = state.score;
    streakEl.innerText = state.streak;
    feedbackEl.classList.remove('hidden');

    // Record stats + adaptive weight
    const activeDrill = state.currentMode === 'CUSTOM' ? getActiveCustomDrill() : null;
    const sourceMode = state.currentMode === 'REVIEW' && state.currentReviewItem ? getReviewSourceMode(state.currentReviewItem) : state.currentMode;
    const mistakeLabel = getMistakeLabel(sourceMode, state.currentPosition, state.correctAction);
    recordStat(state.currentPosition, state.currentMode, isCorrect, activeDrill ? activeDrill.id : null);
    recordDiagnosticResult(action, state.correctAction, isCorrect, combo);
    if (!isCorrect && !wasDiagnosticActive && state.currentMode !== 'REVIEW') {
        addMistakeReplayItem({
            combo,
            position: state.currentPosition,
            mode: state.currentMode,
            sourceMode,
            spot: sourceMode,
            stack: state.currentMode === 'PUSH_FOLD' ? state.currentStack : null,
            drillId: activeDrill ? activeDrill.id : null,
            allStreetScenarioId: state.currentMode === 'ALL_STREET' ? state.currentAllStreetScenarioId : null,
            scenario: scenarioTextEl ? scenarioTextEl.innerText : '',
            userAction: action,
            correctAction: state.correctAction,
            explanation: state.explanation
        });
    }
    if (state.currentMode === 'REVIEW') {
        completeMistakeReplayItem(state.currentReviewItem, isCorrect);
    }
    recordGamification(state.currentMode, isCorrect, activeDrill);
    if (!wasDiagnosticActive) recordTrainingSessionResult(state.currentMode, isCorrect, mistakeLabel);
    updateComboWeight(combo, isCorrect);
    if (lifetimeHandsEl) lifetimeHandsEl.innerText = state.stats.totalHands;

    // Hand history
    const entry = {
        combo, position: state.currentPosition, mode: state.currentMode,
        stack: state.currentMode === 'PUSH_FOLD' ? state.currentStack : null,
        drillId: activeDrill ? activeDrill.id : null,
        allStreetScenarioId: state.currentMode === 'ALL_STREET' ? state.currentAllStreetScenarioId : null,
        userAction: action, correctAction: state.correctAction, correct: isCorrect
    };
    state.handHistory.unshift(entry);
    if (state.handHistory.length > 20) state.handHistory.pop();

    saveToStorage();
    renderHandHistory();
    renderPersonalizedDashboard();

    // Update live accuracy HUD
    if (accuracyHudEl && state.stats.totalHands > 0) {
        const pct = Math.round((state.stats.totalCorrect / state.stats.totalHands) * 100);
        accuracyHudEl.innerText = pct + '%';
        accuracyHudEl.style.color = pct >= 70 ? 'var(--color-raise)' : pct >= 50 ? '#f6ad55' : 'var(--color-fold)';
    }
};

window.nextHand = function () {
    if (startFocusSessionTurn()) return;
    startTurn();
};

function updateCustomActionButtons() {
    if (state.currentMode !== 'CUSTOM') return;
    const drill = getActiveCustomDrill();
    if (!drill) {
        btnCallEl.classList.remove('hidden');
        btnRaiseEl.classList.remove('hidden');
        btnAllInEl.classList.remove('hidden');
        return;
    }
    if (drill.type === DRILL_TYPES.ALL_STREET) {
        updateAllStreetActionButtons(getActiveAllStreetScenario());
        return;
    }
    const defaultAllowed = drill.type === DRILL_TYPES.PUSH_FOLD ? ['Fold', 'All-In']
        : drill.type === DRILL_TYPES.RFI_FOCUS ? ['Fold', 'Raise']
            : ['Fold', 'Call', 'Raise'];
    const allowed = drill.allowedActions || defaultAllowed;
    btnCallEl.classList.toggle('hidden', !allowed.includes('Call'));
    btnRaiseEl.classList.toggle('hidden', !allowed.includes('Raise'));
    btnAllInEl.classList.toggle('hidden', !allowed.includes('All-In'));
}

function updateReviewActionButtons() {
    if (state.currentMode !== 'REVIEW') return;
    const item = state.currentReviewItem;
    const source = getReviewSourceMode(item);
    const allowed = source === 'PUSH_FOLD' ? ['Fold', 'All-In']
        : source === 'RFI' ? ['Fold', 'Raise']
            : ['Fold', 'Call', 'Raise'];
    if (item && item.correctAction === 'All-In' && !allowed.includes('All-In')) allowed.push('All-In');
    btnCallEl.classList.toggle('hidden', !allowed.includes('Call'));
    btnRaiseEl.classList.toggle('hidden', !allowed.includes('Raise'));
    btnAllInEl.classList.toggle('hidden', !allowed.includes('All-In'));
}

window.startMistakeReplay = function () {
    const t = I18N[state.lang] || I18N.en;
    if (!getNextMistakeReplayItem()) {
        showToast(t.reviewEmpty || 'No mistakes ready for review.', 'info');
        return;
    }
    state.activeTab = 'plan';
    if (typeof window.setActiveTab === 'function') window.setActiveTab('plan');
    const selector = document.getElementById('mode-selector');
    if (selector) selector.value = 'REVIEW';
    changeMode('REVIEW');
    syncAppTabPanels();
};

// ============================================================
// MODE CHANGE
// ============================================================
window.changeMode = function (newMode, preserveScore, options = {}) {
    const preserveTurn = options === true || !!(options && options.preserveTurn);
    if (newMode === 'REVIEW') state.activeTab = 'plan';
    if (!preserveScore && state.focusSession && state.focusSession.active) {
        state.focusSession.active = false;
    }
    state.currentMode = newMode;
    const modeSelector = document.getElementById('mode-selector');
    if (modeSelector && modeSelector.value !== newMode) modeSelector.value = newMode;
    if (!preserveScore) {
        state.score = 0; state.streak = 0;
        if (scoreEl) scoreEl.innerText = '0';
        streakEl.innerText = '0';
    }
    document.body.className = '';
    const t = I18N[state.lang];
    resetActionButtonLabels();

    const stackSelector = document.getElementById('stack-selector');

    if (newMode === 'PUSH_FOLD') {
        document.body.classList.add('theme-pushfold');
        coachBadgeEl.innerText = t.badgePushFold;
        coachBadgeEl.style.background = '#e53e3e';
        coachContentEl.innerHTML = t.coachPushFold;
        btnCallEl.classList.add('hidden');
        btnRaiseEl.classList.add('hidden');
        btnAllInEl.classList.remove('hidden');
        if (stackSelector) stackSelector.classList.remove('hidden');
        const customCtrl = document.getElementById('custom-mode-controls');
        if (customCtrl) customCtrl.classList.add('hidden');
    } else if (newMode === 'DEFEND') {
        document.body.classList.add('theme-defend');
        coachBadgeEl.innerText = t.badgeDefend;
        coachBadgeEl.style.background = '#3182ce';
        coachContentEl.innerHTML = t.coachDefend;
        btnCallEl.classList.remove('hidden');
        btnRaiseEl.classList.remove('hidden');
        btnAllInEl.classList.add('hidden');
        if (stackSelector) stackSelector.classList.add('hidden');
        if (stackSelector) stackSelector.classList.add('hidden');
        const customCtrl = document.getElementById('custom-mode-controls');
        if (customCtrl) customCtrl.classList.add('hidden');
    } else if (newMode === 'ALL_STREET') {
        document.body.classList.add('theme-allstreet');
        coachBadgeEl.innerText = t.badgeAllStreet || 'Postflop';
        coachBadgeEl.style.background = '#d6a84a';
        coachContentEl.innerHTML = buildAllStreetCoachHtml(t);
        btnCallEl.classList.remove('hidden');
        btnRaiseEl.classList.remove('hidden');
        btnAllInEl.classList.add('hidden');
        if (stackSelector) stackSelector.classList.add('hidden');
        const customCtrl = document.getElementById('custom-mode-controls');
        if (customCtrl) customCtrl.classList.add('hidden');
        updateAllStreetActionButtons();
    } else if (newMode === 'CUSTOM') {
        document.body.classList.add('theme-custom');
        coachBadgeEl.innerText = t.badgeCustom || 'Custom';
        coachBadgeEl.style.background = '#4c51bf';
        coachContentEl.innerHTML = t.coachCustom;
        btnCallEl.classList.remove('hidden');
        btnRaiseEl.classList.remove('hidden');
        btnAllInEl.classList.remove('hidden');
        if (stackSelector) stackSelector.classList.add('hidden');
        const customCtrl = document.getElementById('custom-mode-controls');
        if (customCtrl) customCtrl.classList.remove('hidden');
        refreshCustomPracticePicker();
        updateCustomActionButtons();
    } else if (newMode === 'REVIEW') {
        document.body.classList.add('theme-review');
        coachBadgeEl.innerText = t.modeReviewMistakesShort || 'Review';
        coachBadgeEl.style.background = '#d69e2e';
        coachContentEl.innerHTML = t.coachReviewMistakes || '<h3>Review Mistakes</h3><p>Replay recent missed spots until they clear.</p>';
        btnCallEl.classList.remove('hidden');
        btnRaiseEl.classList.remove('hidden');
        btnAllInEl.classList.add('hidden');
        if (stackSelector) stackSelector.classList.add('hidden');
        const customCtrl = document.getElementById('custom-mode-controls');
        if (customCtrl) customCtrl.classList.add('hidden');
    } else { // RFI
        document.body.classList.add('theme-rfi');
        coachBadgeEl.innerText = t.badgeRfi;
        coachBadgeEl.style.background = '#38a169';
        coachContentEl.innerHTML = t.coachRfi;
        btnCallEl.classList.remove('hidden');
        btnRaiseEl.classList.remove('hidden');
        btnAllInEl.classList.add('hidden');
        if (stackSelector) stackSelector.classList.add('hidden');
        const customCtrl = document.getElementById('custom-mode-controls');
        if (customCtrl) customCtrl.classList.add('hidden');
    }

    if (btnRangeEditorEl) {
        if (newMode === 'CUSTOM') {
            btnRangeEditorEl.classList.remove('hidden');
        } else {
            btnRangeEditorEl.classList.add('hidden');
        }
    }

    if (preserveTurn) {
        if (state.currentHand) {
            updateScenarioUI();
            const result = evaluateAction(state.currentHand, state.currentPosition);
            state.correctAction = result.action;
            state.explanation = result.explanation;
        }
    } else {
        startTurn();
    }
    updateReviewActionButtons();
    renderHandHistory();
    renderPersonalizedDashboard();
    syncAppTabPanels();
    linkGlossaryTerms(coachContentEl);
};

// ============================================================
// STACK SIZE SELECTOR (Push/Fold)
// ============================================================
window.setStack = function (size) {
    state.currentStack = String(size);
    document.querySelectorAll('.stack-btn').forEach(b => b.classList.toggle('active', b.dataset.stack === String(size)));
    startTurn();
};

// ============================================================
// HAND HISTORY
// ============================================================
function renderHandHistory() {
    const el = document.getElementById('hand-history-list');
    if (!el) return;
    if (state.handHistory.length === 0) {
        el.innerHTML = `<p class="history-empty">${I18N[state.lang].historyEmpty || 'No hands yet.'}</p>`;
        return;
    }
    el.innerHTML = state.handHistory.map(h => {
        const icon = h.correct ? '✅' : '❌';
        const stackLabel = h.stack ? ` ${h.stack}bb` : '';
        return `<div class="history-item ${h.correct ? 'correct' : 'incorrect'}">
            ${icon} <strong>${h.combo}</strong> · ${h.position}${stackLabel} · ${h.mode}
            <span class="history-action">${h.userAction}→<em>${h.correctAction}</em></span>
        </div>`;
    }).join('');
}

// ============================================================
// STATS MODAL
// ============================================================
window.openStatsModal = function () {
    const modal = document.getElementById('stats-modal');
    if (!modal) return;
    const t = I18N[state.lang];
    const s = state.stats;
    const overall = pct(s.totalCorrect, s.totalHands);

    let posRows = POSITIONS.map(pos => {
        const d = s.byPosition[pos] || { hands: 0, correct: 0 };
        const p = pct(d.correct, d.hands);
        return `<tr>
            <td>${pos}</td>
            <td>${d.hands}</td>
            <td>
              <div class="progress-bar-wrap"><div class="progress-bar" style="width:${p}%"></div></div>
            </td>
            <td>${p}%</td>
        </tr>`;
    }).join('');

    const modeNames = { RFI: 'RFI (Open)', DEFEND: 'Defense', PUSH_FOLD: 'Push/Fold', CUSTOM: 'Custom', ALL_STREET: t.modeAllStreetShort || 'Postflop', REVIEW: t.modeReviewMistakesShort || 'Review' };
    let modeRows = Object.keys(modeNames).map(m => {
        const d = s.byMode[m] || { hands: 0, correct: 0 };
        const p = pct(d.correct, d.hands);
        return `<tr>
            <td>${modeNames[m]}</td>
            <td>${d.hands}</td>
            <td>
              <div class="progress-bar-wrap"><div class="progress-bar" style="width:${p}%"></div></div>
            </td>
            <td>${p}%</td>
        </tr>`;
    }).join('');

    const drillRows = Object.entries(s.byCustomDrill || {}).map(([id, d]) => {
        const drill = state.customDrills[id];
        const p = pct(d.correct, d.hands);
        return `<tr>
            <td>${escapeHtml(drill ? drill.name : id)}</td>
            <td>${d.hands}</td>
            <td>
              <div class="progress-bar-wrap"><div class="progress-bar" style="width:${p}%"></div></div>
            </td>
            <td>${p}%</td>
        </tr>`;
    }).join('');
    const weekly = getWeeklySummary();
    const masteryRows = Object.entries(state.gamification.mastery || {}).map(([key, d]) => {
        return `<tr><td>${escapeHtml(key)}</td><td>${d.hands}</td><td><div class="progress-bar-wrap"><div class="progress-bar" style="width:${d.level}%"></div></div></td><td>${d.level}%</td></tr>`;
    }).join('');
    const achievementRows = (state.gamification.achievements || []).slice(-5).map(item => `<li>${escapeHtml(item.label)}</li>`).join('');
    const gamificationHtml = state.gamification.hidden ? `
        <button class="btn-range-action" onclick="toggleGamificationHidden()">${t.gamificationShow || 'Show XP & Mastery'}</button>
    ` : `
        <h3>${t.gamificationTitle || 'XP & Mastery'}</h3>
        <div class="stats-overall">
            <div class="overall-label">XP</div>
            <div class="overall-value">${state.gamification.xp || 0}</div>
            <div class="overall-sub">${(t.weeklySummary || 'This week: {hands} hands · {accuracy}% · trend {trend} · next {nextDrill}')
                .replace('{hands}', weekly.hands)
                .replace('{accuracy}', weekly.accuracy)
                .replace('{trend}', `${weekly.trend >= 0 ? '+' : ''}${weekly.trend}%`)
                .replace('{nextDrill}', weekly.nextDrill)}</div>
        </div>
        <table class="stats-table"><thead><tr><th>${t.statsMode || 'Mode'}</th><th>${t.lifetimeHands || 'Hands'}</th><th>${t.mastery || 'Mastery'}</th><th>%</th></tr></thead><tbody>${masteryRows || `<tr><td colspan="4">${t.noMastery || 'No mastery data yet.'}</td></tr>`}</tbody></table>
        <h3>${t.achievementsTitle || 'Achievements'}</h3>
        <ul class="achievement-list">${achievementRows || `<li>${t.noAchievements || 'No achievements yet.'}</li>`}</ul>
        <button class="btn-range-action btn-range-clear" onclick="toggleGamificationHidden()">${t.gamificationHide || 'Hide XP & Mastery'}</button>
    `;

    document.getElementById('stats-content').innerHTML = `
        <div class="stats-overall">
            <div class="overall-label">${t.statsOverallAccuracy || 'Overall Accuracy'}</div>
            <div class="overall-value">${overall}%</div>
            <div class="overall-sub">${s.totalCorrect} / ${s.totalHands} ${t.statsHands || 'hands'}</div>
        </div>
        <h3>${t.statsByPosition || 'By Position'}</h3>
        <table class="stats-table"><thead><tr><th>${t.statsPos || 'Pos'}</th><th>${t.lifetimeHands || 'Hands'}</th><th>${t.statsAccuracy || 'Accuracy'}</th><th>%</th></tr></thead><tbody>${posRows}</tbody></table>
        <h3>${t.statsByMode || 'By Mode'}</h3>
        <table class="stats-table"><thead><tr><th>${t.statsMode || 'Mode'}</th><th>${t.lifetimeHands || 'Hands'}</th><th>${t.statsAccuracy || 'Accuracy'}</th><th>%</th></tr></thead><tbody>${modeRows}</tbody></table>
        <h3>${t.statsByCustomDrill || 'By Custom Drill'}</h3>
        <table class="stats-table"><thead><tr><th>${t.statsDrill || 'Drill'}</th><th>${t.lifetimeHands || 'Hands'}</th><th>${t.statsAccuracy || 'Accuracy'}</th><th>%</th></tr></thead><tbody>${drillRows || `<tr><td colspan="4">${t.statsNoCustomDrills || 'No custom drill stats yet.'}</td></tr>`}</tbody></table>
        ${gamificationHtml}
        <button class="btn-reset-stats" onclick="resetStats()">${t.statsReset || 'Reset All Stats'}</button>
    `;
    modal.classList.remove('hidden');
};

window.closeStatsModal = function () {
    const el = document.getElementById('stats-modal');
    if (el) el.classList.add('hidden');
};

window.resetStats = function () {
    const t = I18N[state.lang] || I18N.en;
    return runAfterConfirmation(
        requestGlassConfirmation({
            title: t.confirmStatsResetTitle || 'Reset stats?',
            message: t.statsResetConfirm || 'Reset all lifetime stats?',
            confirmLabel: t.statsReset || 'Reset All Stats',
            cancelLabel: t.confirmCancel || 'Cancel',
            danger: true
        }),
        () => {
            state.stats = getDefaultStats();
            state.comboWeights = {};
            state.handHistory = [];
            state.mistakeReplay = getDefaultMistakeReplay();
            state.trainingSession = null;
            state.gamification = getDefaultGamification({ hidden: state.gamification.hidden });
            state.monetization = getDefaultMonetization({
                donationIntent: state.monetization && state.monetization.donationIntent,
                lifetimeAdFree: state.monetization && state.monetization.lifetimeAdFree
            });
            state.score = 0;
            state.streak = 0;
            saveToStorage();
            renderHandHistory();
            if (scoreEl) scoreEl.innerText = '0';
            if (streakEl) streakEl.innerText = '0';
            if (lifetimeHandsEl) lifetimeHandsEl.innerText = '0';
            if (accuracyHudEl) {
                accuracyHudEl.innerText = '—';
                accuracyHudEl.style.color = 'var(--text-secondary)';
            }
            openStatsModal();
            renderPersonalizedDashboard();
        }
    );
};

window.toggleGamificationHidden = function () {
    state.gamification.hidden = !state.gamification.hidden;
    saveToStorage();
    openStatsModal();
};

window.openSupportModal = function () {
    const modal = document.getElementById('support-modal');
    if (modal) modal.classList.remove('hidden');
};

window.closeSupportModal = function () {
    const modal = document.getElementById('support-modal');
    if (modal) modal.classList.add('hidden');
};

// ============================================================
// SERVICE WORKER REGISTRATION (PWA)
// ============================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => {
            console.log('SW registered: ', reg.scope);
        }).catch(err => {
            console.log('SW registration failed: ', err);
        });
    });
}

// ============================================================
// RANGE EDITOR
// ============================================================
let editorState = {}; // comboName -> 'raise'|'call'|'fold'

// ============================================================
// RANGE CODE (offline export/import, lossless)
// - 169 cells, each in {fold, raise, call}
// - Pack 5 trits (base-3 digits) into 1 byte since 3^5 = 243 < 256
// - Append CRC16-CCITT to detect typos
// - Encode bytes as Base64URL without padding
// ============================================================
const RANGE_CODE_PREFIX = 'PT1.'; // versioned prefix, safe for copy/paste
const RANGE_CELL_COUNT = CHART_RANKS.length * CHART_RANKS.length; // 169
const TRITS_PER_BYTE = 5;
const TRIT_POW3 = [1, 3, 9, 27, 81]; // 3^0..3^4
const RANGE_STATES = /** @type {const} */ ({ fold: 0, raise: 1, call: 2 });
const RANGE_STATES_REV = /** @type {const} */ (['fold', 'raise', 'call']);

function crc16Ccitt(bytes) {
    let crc = 0xffff;
    for (let i = 0; i < bytes.length; i++) {
        crc ^= (bytes[i] & 0xff) << 8;
        for (let b = 0; b < 8; b++) {
            crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
            crc &= 0xffff;
        }
    }
    return crc & 0xffff;
}

function base64UrlEncode(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const b64 = btoa(binary);
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecodeToBytes(str) {
    if (!/^[A-Za-z0-9_-]+$/.test(str)) throw new Error('base64');
    const padded = str.replace(/-/g, '+').replace(/_/g, '/')
        + '==='.slice((str.length + 3) % 4);
    let binary;
    try {
        binary = atob(padded);
    } catch (e) {
        throw new Error('base64');
    }
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i) & 0xff;
    return out;
}

function getRangeCellOrder() {
    // Must match renderEditorGrid() order for stable encoding across devices.
    const names = [];
    for (let r1 of CHART_RANKS) {
        for (let r2 of CHART_RANKS) {
            const i1 = CHART_RANKS.indexOf(r1), i2 = CHART_RANKS.indexOf(r2);
            const isPair = i1 === i2;
            const isSuited = i2 > i1;
            const high = i1 <= i2 ? r1 : r2, low = i1 <= i2 ? r2 : r1;
            const name = isPair ? `${high}${low}` : `${high}${low}${isSuited ? 's' : 'o'}`;
            names.push(name);
        }
    }
    return names;
}
const RANGE_CELL_ORDER = getRangeCellOrder();

function encodeEditorStateToRangeCode(es) {
    const trits = new Array(RANGE_CELL_COUNT);
    for (let i = 0; i < RANGE_CELL_COUNT; i++) {
        const name = RANGE_CELL_ORDER[i];
        const st = es[name] || 'fold';
        trits[i] = RANGE_STATES[st] ?? 0;
    }

    const byteCount = Math.ceil(RANGE_CELL_COUNT / TRITS_PER_BYTE);
    const packed = new Uint8Array(byteCount + 2); // + CRC16
    let t = 0;
    for (let bi = 0; bi < byteCount; bi++) {
        let val = 0;
        for (let k = 0; k < TRITS_PER_BYTE; k++) {
            const trit = (t < trits.length) ? trits[t] : 0;
            val += trit * TRIT_POW3[k];
            t++;
        }
        packed[bi] = val & 0xff;
    }
    const crc = crc16Ccitt(packed.slice(0, byteCount));
    packed[byteCount] = (crc >> 8) & 0xff;
    packed[byteCount + 1] = crc & 0xff;

    return RANGE_CODE_PREFIX + base64UrlEncode(packed);
}

function decodeRangeCodeToEditorState(code) {
    if (typeof code !== 'string') throw new Error('invalid');
    const input = code.trim();
    let raw = input;
    if (input.includes('.')) {
        if (!input.startsWith(RANGE_CODE_PREFIX)) throw new Error('prefix');
        raw = input.slice(RANGE_CODE_PREFIX.length).trim();
    }
    if (raw.length !== 48) throw new Error('length');
    const bytes = base64UrlDecodeToBytes(raw);
    const expectedPackedBytes = Math.ceil(RANGE_CELL_COUNT / TRITS_PER_BYTE);
    if (bytes.length !== expectedPackedBytes + 2) throw new Error('length');

    const data = bytes.slice(0, expectedPackedBytes);
    const gotCrc = ((bytes[expectedPackedBytes] & 0xff) << 8) | (bytes[expectedPackedBytes + 1] & 0xff);
    const wantCrc = crc16Ccitt(data);
    if (gotCrc !== wantCrc) throw new Error('crc');

    const es = {};
    let cellIdx = 0;
    for (let bi = 0; bi < data.length; bi++) {
        let v = data[bi];
        for (let k = 0; k < TRITS_PER_BYTE; k++) {
            if (cellIdx >= RANGE_CELL_COUNT) break;
            const trit = v % 3;
            v = Math.floor(v / 3);
            const st = RANGE_STATES_REV[trit] || 'fold';
            if (st !== 'fold') es[RANGE_CELL_ORDER[cellIdx]] = st;
            cellIdx++;
        }
    }
    return es;
}

function getRangeCodeErrorMessage(error) {
    const t = I18N[state.lang] || I18N.en;
    const code = String(error && error.message || 'invalid');
    const key = `rangeCodeError${code.charAt(0).toUpperCase()}${code.slice(1)}`;
    return t[key] || t.rangeCodeErrorInvalid || 'Invalid range code.';
}

function countEditorStates(es) {
    let raise = 0;
    let call = 0;
    let fold = 0;
    for (const name of RANGE_CELL_ORDER) {
        if (es[name] === 'raise') raise++;
        else if (es[name] === 'call') call++;
        else fold++;
    }
    return { raise, call, fold };
}

function getCompactRangeCodeFromEditor() {
    return encodeEditorStateToRangeCode(editorState).slice(RANGE_CODE_PREFIX.length);
}

function updateRangeCodePanel() {
    const output = document.getElementById('range-code-output');
    const countsEl = document.getElementById('range-code-counts');
    if (!output && !countsEl) return;

    const t = I18N[state.lang] || I18N.en;
    const counts = countEditorStates(editorState);
    if (output) output.value = getCompactRangeCodeFromEditor();
    if (countsEl) {
        countsEl.innerText = (t.rangeCodeCounts || 'Raise {raise} · Call {call} · Fold {fold}')
            .replace('{raise}', counts.raise)
            .replace('{call}', counts.call)
            .replace('{fold}', counts.fold);
    }
}

function setRangeCodePreview(message, type, decodedState) {
    const preview = document.getElementById('range-code-preview');
    const applyBtn = document.getElementById('range-code-apply');
    if (preview) {
        preview.innerText = message;
        preview.classList.remove('success', 'error');
        if (type) preview.classList.add(type);
    }
    if (applyBtn) {
        applyBtn.disabled = !decodedState;
        applyBtn._decodedRangeState = decodedState || null;
    }
}

function writeClipboardOrPrompt(text, promptLabel) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).catch(() => {
            prompt(promptLabel, text);
        });
    }
    prompt(promptLabel, text);
    return Promise.resolve();
}

window.copyRangeCode = function () {
    const t = I18N[state.lang] || I18N.en;
    const text = getCompactRangeCodeFromEditor();
    writeClipboardOrPrompt(text, t.rangeCodeCopyFallback || 'Copy range code:')
        .then(() => showToast(t.rangeCodeCopied || 'Range code copied!', 'success'));
};

window.previewRangeCodeInput = function () {
    const t = I18N[state.lang] || I18N.en;
    const input = document.getElementById('range-code-input');
    const raw = input ? input.value.trim() : '';
    if (!raw) {
        setRangeCodePreview(t.rangeCodePreviewEmpty || 'Paste a Range Code to preview it.', null, null);
        return;
    }

    try {
        const decoded = decodeRangeCodeToEditorState(raw);
        const counts = countEditorStates(decoded);
        const message = (t.rangeCodePreviewValid || 'Valid code: Raise {raise} · Call {call} · Fold {fold}')
            .replace('{raise}', counts.raise)
            .replace('{call}', counts.call)
            .replace('{fold}', counts.fold);
        setRangeCodePreview(message, 'success', decoded);
    } catch (error) {
        setRangeCodePreview(getRangeCodeErrorMessage(error), 'error', null);
    }
};

window.applyRangeCodePreview = function () {
    const t = I18N[state.lang] || I18N.en;
    const applyBtn = document.getElementById('range-code-apply');
    const decoded = applyBtn ? applyBtn._decodedRangeState : null;
    if (!decoded) return;
    editorState = { ...decoded };
    state.rangeEditorData = { ...editorState };
    renderEditorGrid();
    showToast(t.rangeCodeApplied || 'Range code applied to grid.', 'success');
};

window.openRangeEditor = function () {
    editorState = Object.assign({}, state.rangeEditorData);
    renderEditorGrid();
    document.getElementById('range-editor-modal').classList.remove('hidden');
    // populate saved ranges dropdown
    refreshRangeDropdown();
};
window.closeRangeEditor = function () {
    document.getElementById('range-editor-modal').classList.add('hidden');
};

function renderEditorGrid() {
    const grid = document.getElementById('range-editor-grid');
    if (!grid) return;
    let html = '';
    for (let r1 of CHART_RANKS) {
        for (let r2 of CHART_RANKS) {
            const i1 = CHART_RANKS.indexOf(r1), i2 = CHART_RANKS.indexOf(r2);
            const isPair = i1 === i2;
            const isSuited = i2 > i1;
            const high = i1 <= i2 ? r1 : r2, low = i1 <= i2 ? r2 : r1;
            const name = isPair ? `${high}${low}` : `${high}${low}${isSuited ? 's' : 'o'}`;
            const state_ = editorState[name] || 'fold';
            html += `<div class="chart-cell editor-cell ${state_}" data-combo="${name}" onclick="toggleEditorCell('${name}')">${name}</div>`;
        }
    }
    grid.innerHTML = html;
    updateRangeCodePanel();
}

window.toggleEditorCell = function (name) {
    const cur = editorState[name] || 'fold';
    const cycle = { fold: 'raise', raise: 'call', call: 'fold' };
    editorState[name] = cycle[cur];
    const el = document.querySelector(`.editor-cell[data-combo="${name}"]`);
    if (el) { el.className = `chart-cell editor-cell ${editorState[name]}`; }
    updateRangeCodePanel();
};

window.clearEditorGrid = function () {
    editorState = {};
    renderEditorGrid();
};

window.saveCustomRange = function () {
    const t = I18N[state.lang] || I18N.en;
    const name = (document.getElementById('range-name-input').value || '').trim();
    if (!name) { showToast(t.rangeNameRequired || 'Please enter a range name.', 'error'); return; }
    const raise = Object.keys(editorState).filter(k => editorState[k] === 'raise');
    const call = Object.keys(editorState).filter(k => editorState[k] === 'call');
    state.customRanges[name] = { raise, call };
    state.rangeEditorData = { ...editorState };
    saveToStorage();
    refreshRangeDropdown();
    showToast((t.rangeSavedToast || 'Range "{name}" saved.').replace('{name}', name), 'success');
};

window.loadCustomRange = function () {
    const sel = document.getElementById('range-load-select');
    const name = sel ? sel.value : '';
    if (!name || !state.customRanges[name]) return;
    editorState = {};
    state.customRanges[name].raise.forEach(c => editorState[c] = 'raise');
    state.customRanges[name].call.forEach(c => editorState[c] = 'call');
    renderEditorGrid();
};

window.deleteCustomRange = function () {
    const sel = document.getElementById('range-load-select');
    const name = sel ? sel.value : '';
    if (!name || !state.customRanges[name]) return;
    delete state.customRanges[name];
    saveToStorage();
    refreshRangeDropdown();
};

function refreshRangeDropdown() {
    const sel = document.getElementById('range-load-select');
    if (!sel) return;
    const t = I18N[state.lang] || I18N.en;
    const names = Object.keys(state.customRanges);
    sel.innerHTML = names.length === 0
        ? `<option value="">${escapeHtml(t.rangeNoSavedOption || '-- No saved ranges --')}</option>`
        : names.map(n => `<option value="${n}">${n}</option>`).join('');
}

window.selectCustomRange = function (name) {
    state.currentCustomRangeName = name;
    state.currentCustomDrillId = null;
    state.currentCustomPracticeType = 'range';
    document.querySelectorAll('#custom-range-picker-list .stack-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-range') === name);
    });
    refreshCustomDrillPicker();
    updateCustomActionButtons();
    nextHand();
};

function refreshCustomPracticePicker() {
    const container = document.getElementById('custom-range-picker-list');
    if (!container) return;
    const t = I18N[state.lang] || I18N.en;
    const names = Object.keys(state.customRanges);
    if (names.length === 0) {
        container.innerHTML = `<span style="font-size:0.8rem; opacity:0.6;">${t.customNoSavedRanges || 'No saved ranges.'}</span>`;
    } else {
        if (!state.currentCustomRangeName) state.currentCustomRangeName = names[0];
        container.innerHTML = names.map(n => `
            <button class="stack-btn ${state.currentCustomPracticeType !== 'drill' && state.currentCustomRangeName === n ? 'active' : ''}" 
                    data-range="${escapeHtml(n)}" onclick="selectCustomRange('${escapeJsArg(n)}')">${escapeHtml(n)}</button>
        `).join('');
    }
    refreshCustomDrillPicker();
}

function getDrillTypeLabel(type) {
    const t = I18N[state.lang] || I18N.en;
    const labels = {
        RFI_FOCUS: t.drillTypeRfi || 'RFI Focus',
        DEFENSE_VS_OPEN: t.drillTypeDefense || 'Defense vs Open',
        FACING_3BET: t.drillTypeFacing3Bet || 'Facing 3-Bet',
        PUSH_FOLD: t.drillTypePushFold || 'Push/Fold',
        ALL_STREET: t.drillTypeAllStreet || 'All-Street'
    };
    return labels[type] || type;
}

function getGameTypeLabel(gameType) {
    const t = I18N[state.lang] || I18N.en;
    return gameType === GAME_TYPES.TOURNAMENT ? (t.drillGameTournament || 'Tournament') : (t.drillGameCash || 'Cash');
}

function refreshCustomDrillPicker() {
    const container = document.getElementById('custom-drill-picker-list');
    if (!container) return;
    const t = I18N[state.lang] || I18N.en;
    const drills = listCustomDrills().filter(canTrainCustomDrill);
    if (drills.length === 0) {
        container.innerHTML = `<span style="font-size:0.8rem; opacity:0.6;">${t.drillEmptyState || 'No custom drills yet.'}</span>`;
        return;
    }
    container.innerHTML = drills.map(drill => `
        <button class="stack-btn ${state.currentCustomPracticeType === 'drill' && state.currentCustomDrillId === drill.id ? 'active' : ''}"
                data-drill="${escapeHtml(drill.id)}"
                onclick="selectCustomDrill('${escapeJsArg(drill.id)}')">${escapeHtml(drill.name)}</button>
    `).join('');
}

window.selectCustomDrill = function (id) {
    state.currentCustomDrillId = id;
    state.currentCustomPracticeType = 'drill';
    document.querySelectorAll('#custom-drill-picker-list .stack-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-drill') === id);
    });
    document.querySelectorAll('#custom-range-picker-list .stack-btn').forEach(b => b.classList.remove('active'));
    updateCustomActionButtons();
    nextHand();
};

window.openDrillManager = function () {
    resetDrillForm();
    renderDrillManagerList();
    const modal = document.getElementById('drill-manager-modal');
    if (modal) modal.classList.remove('hidden');
};

window.closeDrillManager = function () {
    const modal = document.getElementById('drill-manager-modal');
    if (modal) modal.classList.add('hidden');
};

window.resetDrillForm = function () {
    const idInput = document.getElementById('drill-id-input');
    const nameInput = document.getElementById('drill-name-input');
    const typeSelect = document.getElementById('drill-type-select');
    const gameSelect = document.getElementById('drill-game-type-select');
    if (idInput) idInput.value = '';
    if (nameInput) nameInput.value = '';
    if (typeSelect) typeSelect.value = DRILL_TYPES.RFI_FOCUS;
    if (gameSelect) gameSelect.value = GAME_TYPES.CASH;
    setDrillBuilderDefaults({});
    setDrillFormStatus('drillNewStatus');
    syncDrillFormFields();
};

function setDrillFormStatus(key) {
    const el = document.getElementById('drill-form-status');
    if (!el) return;
    const t = I18N[state.lang] || I18N.en;
    const label = t[key] || (key === 'drillEditingStatus' ? 'Editing' : 'New');
    el.setAttribute('data-i18n', key);
    el.textContent = label;
    el.innerText = label;
}

function setDrillBuilderDefaults(drill) {
    const setValue = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.value = value;
    };
    setValue('drill-hero-position-select', drill.heroPosition || 'BTN');
    setValue('drill-opener-position-select', drill.openerPosition || 'CO');
    setValue('drill-villain-position-select', drill.villainPosition || 'BB');
    setValue('drill-stack-input', drill.effectiveStackBb || drill.stackBb || 100);
    setValue('drill-street-select', drill.street || DRILL_RANDOM_VALUE);
    setValue('drill-template-select', drill.template || DRILL_RANDOM_VALUE);
    setValue('drill-board-preset-select', isDrillRandomValue(drill.boardPreset)
        ? DRILL_RANDOM_VALUE
        : normalizeAllStreetPresetKey(drill.boardPreset, ALL_STREET_BOARD_PRESET_ALIASES) || DRILL_RANDOM_VALUE);
    setValue('drill-hand-quality-select', drill.handQuality || DRILL_RANDOM_VALUE);
    setValue('drill-pot-preset-select', drill.potPreset || DRILL_RANDOM_VALUE);
    setValue('drill-raise-size-select', drill.raiseSizing || 'BET_33');
    const openSizeIsRandom = isDrillRandomValue(drill.openSizeBb);
    setValue('drill-open-size-input', openSizeIsRandom ? 2.5 : (drill.openSizeBb || 2.5));
    setValue('drill-threebet-size-input', drill.threeBetSizeBb || 9);
    setValue('drill-raise-range-input', (drill.ranges && (drill.ranges.raise || drill.ranges.open || drill.ranges.shove)) || '');
    setValue('drill-call-range-input', (drill.ranges && drill.ranges.call) || '');
    const ante = document.getElementById('drill-ante-input');
    if (ante) ante.checked = !!drill.ante;
    const randomOpenSize = document.getElementById('drill-open-size-random-input');
    if (randomOpenSize) randomOpenSize.checked = openSizeIsRandom;
    syncDrillOpenSizeRandom();
    const positionsSelect = document.getElementById('drill-hero-positions-select');
    if (positionsSelect) {
        const selected = drill.heroPositions || ['BTN'];
        Array.from(positionsSelect.options).forEach(option => {
            option.selected = selected.includes(option.value);
        });
        positionsSelect.selectedOptions = Array.from(positionsSelect.options).filter(option => option.selected);
    }
    const selected = drill.heroPositions || ['BTN'];
    document.querySelectorAll('#drill-hero-position-chips input').forEach(input => {
        input.checked = selected.includes(input.value);
    });
}

function setDrillFieldHidden(id, hidden) {
    const el = document.getElementById(id);
    if (el && el.classList) el.classList.toggle('hidden', !!hidden);
}

window.syncDrillOpenSizeRandom = function () {
    const randomInput = document.getElementById('drill-open-size-random-input');
    const sizeInput = document.getElementById('drill-open-size-input');
    if (!randomInput || !sizeInput) return;
    sizeInput.disabled = !!randomInput.checked;
};

window.syncDrillFormFields = function () {
    const type = (document.getElementById('drill-type-select') || {}).value;
    const fields = document.getElementById('facing-3bet-fields');
    if (fields) fields.classList.toggle('hidden', false);
    const isRfi = type === DRILL_TYPES.RFI_FOCUS;
    const isDefense = type === DRILL_TYPES.DEFENSE_VS_OPEN;
    const isFacing3Bet = type === DRILL_TYPES.FACING_3BET;
    const isPushFold = type === DRILL_TYPES.PUSH_FOLD;
    const isAllStreet = type === DRILL_TYPES.ALL_STREET;

    setDrillFieldHidden('drill-hero-positions-field', !(isRfi || isPushFold));
    setDrillFieldHidden('drill-hero-position-field', !(isDefense || isFacing3Bet || isAllStreet));
    setDrillFieldHidden('drill-opener-position-field', !isDefense);
    setDrillFieldHidden('drill-villain-position-field', !(isFacing3Bet || isAllStreet));
    setDrillFieldHidden('drill-stack-field', !(isPushFold || isFacing3Bet || isAllStreet));
    setDrillFieldHidden('drill-open-size-field', !(isRfi || isDefense || isFacing3Bet));
    setDrillFieldHidden('drill-open-size-random-field', !(isRfi || isDefense || isFacing3Bet));
    setDrillFieldHidden('drill-threebet-size-field', !isFacing3Bet);
    setDrillFieldHidden('drill-ante-field', !isPushFold);
    setDrillFieldHidden('drill-allstreet-fields', !isAllStreet);
    setDrillFieldHidden('drill-raise-range-field', isAllStreet);
    setDrillFieldHidden('drill-call-range-field', !(isDefense || isFacing3Bet));
};

function getSelectedHeroPositions() {
    const chips = Array.from(document.querySelectorAll('#drill-hero-position-chips input'));
    if (chips.length) {
        const selectedChips = chips.filter(input => input.checked).map(input => input.value);
        return selectedChips.length ? selectedChips : ['BTN'];
    }
    const select = document.getElementById('drill-hero-positions-select');
    if (!select) return ['BTN'];
    const selected = Array.from(select.selectedOptions || []).map(option => option.value);
    return selected.length ? selected : ['BTN'];
}

function getDrillOpenSizeFormValue() {
    const randomInput = document.getElementById('drill-open-size-random-input');
    if (randomInput && randomInput.checked) return DRILL_RANDOM_VALUE;
    const raw = (document.getElementById('drill-open-size-input') || {}).value;
    return Number(raw || 2.5);
}

function getNextAutoDrillName() {
    const t = I18N[state.lang] || I18N.en;
    const format = t.drillAutoNameFormat || 'Scenario {index}';
    const existing = new Set(Object.values(state.customDrills).map(drill => drill.name));
    let index = 1;
    let candidate = format.replace('{index}', index);
    while (existing.has(candidate)) {
        index++;
        candidate = format.replace('{index}', index);
    }
    return candidate;
}

function readDrillDetailFormFields(type) {
    const t = I18N[state.lang] || I18N.en;
    const valueOf = id => (document.getElementById(id) || {}).value;
    const checkedOf = id => !!((document.getElementById(id) || {}).checked);
    const raiseCode = String(valueOf('drill-raise-range-input') || '').trim();
    const callCode = String(valueOf('drill-call-range-input') || '').trim();
    const ranges = {};
    const common = {
        openSizeBb: getDrillOpenSizeFormValue(),
        ante: checkedOf('drill-ante-input')
    };
    if (type === DRILL_TYPES.RFI_FOCUS) {
        if (raiseCode) ranges.open = raiseCode;
        return {
            ...common,
            heroPositions: getSelectedHeroPositions(),
            allowedActions: ['Fold', 'Raise'],
            ranges
        };
    }
    if (type === DRILL_TYPES.DEFENSE_VS_OPEN) {
        if (raiseCode) ranges.raise = raiseCode;
        if (callCode) ranges.call = callCode;
        return {
            ...common,
            heroPosition: valueOf('drill-hero-position-select') || 'BTN',
            openerPosition: valueOf('drill-opener-position-select') || 'CO',
            allowedActions: ['Fold', 'Call', 'Raise'],
            ranges
        };
    }
    if (type === DRILL_TYPES.PUSH_FOLD) {
        if (raiseCode) ranges.shove = raiseCode;
        return {
            ...common,
            heroPositions: getSelectedHeroPositions(),
            stackBb: Number(valueOf('drill-stack-input') || 10),
            allowedActions: ['Fold', 'All-In'],
            ranges
        };
    }
    if (type === DRILL_TYPES.ALL_STREET) {
        const effectiveStackBb = Number(valueOf('drill-stack-input') || 100);
        return {
            street: valueOf('drill-street-select') || DRILL_RANDOM_VALUE,
            template: valueOf('drill-template-select') || DRILL_RANDOM_VALUE,
            boardPreset: valueOf('drill-board-preset-select') || DRILL_RANDOM_VALUE,
            handQuality: valueOf('drill-hand-quality-select') || DRILL_RANDOM_VALUE,
            potPreset: valueOf('drill-pot-preset-select') || DRILL_RANDOM_VALUE,
            raiseSizing: valueOf('drill-raise-size-select') || 'BET_33',
            heroPosition: valueOf('drill-hero-position-select') || 'BTN',
            villainPosition: valueOf('drill-villain-position-select') || 'BB',
            effectiveStackBb,
            defaultAction: 'Fold',
            ranges: {}
        };
    }
    if (raiseCode) ranges.raise = raiseCode;
    if (callCode) ranges.call = callCode;
    return {
        ...common,
        heroPosition: valueOf('drill-hero-position-select') || 'BTN',
        villainPosition: valueOf('drill-villain-position-select') || 'BB',
        effectiveStackBb: Number(valueOf('drill-stack-input') || 100),
        threeBetSizeBb: Number(valueOf('drill-threebet-size-input') || 9),
        allowedActions: ['Fold', 'Call', 'Raise'],
        ranges
    };
}

window.saveDrillFromForm = function (event) {
    if (event) event.preventDefault();
    const t = I18N[state.lang] || I18N.en;
    const id = (document.getElementById('drill-id-input') || {}).value || '';
    const nameInput = ((document.getElementById('drill-name-input') || {}).value || '').trim();
    const name = nameInput || getNextAutoDrillName();
    const type = (document.getElementById('drill-type-select') || {}).value || DRILL_TYPES.RFI_FOCUS;
    const gameType = (document.getElementById('drill-game-type-select') || {}).value || GAME_TYPES.CASH;
    const existing = id ? state.customDrills[id] : null;
    const base = {
        ...(existing || {}),
        id: id || undefined,
        name,
        type,
        gameType,
        draft: true,
        enabled: false
    };
    const input = { ...base, ...readDrillDetailFormFields(type) };
    const candidate = createCustomDrill(input);
    const validation = validateCustomDrill(candidate);
    const drill = validation.valid ? { ...candidate, draft: false, enabled: true } : candidate;
    state.customDrills[drill.id] = drill;
    saveToStorage();
    renderDrillManagerList();
    refreshCustomDrillPicker();
    resetDrillForm();
    showToast(t.drillSaved || 'Drill draft saved.', 'success');
};

window.editCustomDrill = function (id) {
    const drill = state.customDrills[id];
    if (!drill) return;
    const idInput = document.getElementById('drill-id-input');
    const nameInput = document.getElementById('drill-name-input');
    const typeSelect = document.getElementById('drill-type-select');
    const gameSelect = document.getElementById('drill-game-type-select');
    if (idInput) idInput.value = drill.id;
    if (nameInput) nameInput.value = drill.name || '';
    if (typeSelect) typeSelect.value = drill.type || DRILL_TYPES.RFI_FOCUS;
    if (gameSelect) gameSelect.value = drill.gameType || GAME_TYPES.CASH;
    setDrillBuilderDefaults(drill);
    setDrillFormStatus('drillEditingStatus');
    syncDrillFormFields();
};

window.duplicateDrillFromManager = function (id) {
    const t = I18N[state.lang] || I18N.en;
    const result = duplicateCustomDrill(id);
    if (!result.ok) {
        showToast(t.drillActionFailed || 'Drill action failed.', 'error');
        return;
    }
    renderDrillManagerList();
    refreshCustomDrillPicker();
    showToast(t.drillDuplicated || 'Drill duplicated.', 'success');
};

window.deleteDrillFromManager = function (id) {
    const t = I18N[state.lang] || I18N.en;
    return runAfterConfirmation(
        requestGlassConfirmation({
            title: t.confirmDrillDeleteTitle || 'Delete drill?',
            message: t.drillDeleteConfirm || 'Delete this drill?',
            confirmLabel: t.drillDeleteAction || t.drillDelete || 'Delete',
            cancelLabel: t.confirmCancel || 'Cancel',
            danger: true
        }),
        () => {
            if (!deleteCustomDrill(id)) {
                showToast(t.drillActionFailed || 'Drill action failed.', 'error');
                return;
            }
            if (state.currentCustomDrillId === id) state.currentCustomDrillId = null;
            renderDrillManagerList();
            refreshCustomDrillPicker();
            showToast(t.drillDeleted || 'Drill deleted.', 'success');
        }
    );
};

window.exportDrillDefinition = function (id) {
    const t = I18N[state.lang] || I18N.en;
    const drill = state.customDrills[id];
    if (!drill) {
        showToast(t.drillActionFailed || 'Drill action failed.', 'error');
        return;
    }
    writeClipboardOrPrompt(serializeDrillDefinition(drill), t.drillExportFallback || 'Copy drill definition:')
        .then(() => showToast(t.drillExported || 'Drill exported.', 'success'));
};

window.importDrillDefinition = function () {
    const t = I18N[state.lang] || I18N.en;
    const raw = prompt(t.drillImportPrompt || 'Paste drill definition JSON:');
    if (!raw) return;
    try {
        const drill = parseDrillDefinition(raw.trim());
        state.customDrills[drill.id] = drill;
        saveToStorage();
        renderDrillManagerList();
        refreshCustomDrillPicker();
        showToast(t.drillImported || 'Drill imported.', 'success');
    } catch (e) {
        showToast(t.drillImportInvalid || 'Invalid drill definition.', 'error');
    }
};

function renderDrillManagerList() {
    const container = document.getElementById('drill-manager-list');
    if (!container) return;
    const t = I18N[state.lang] || I18N.en;
    const drills = listCustomDrills();
    if (drills.length === 0) {
        container.innerHTML = `<div class="drill-empty">${t.drillEmptyState || 'No custom drills yet.'}</div>`;
        return;
    }
    container.innerHTML = drills.map(drill => {
        const trainable = canTrainCustomDrill(drill);
        const status = trainable ? (t.drillReadyStatus || 'Ready') : (t.drillDraftStatus || 'Draft');
        const statusClass = trainable ? 'is-ready' : 'is-draft';
        return `
            <div class="drill-card ${statusClass}">
                <div class="drill-card-main">
                    <div class="drill-card-title-row">
                        <div class="drill-card-title">${escapeHtml(drill.name)}</div>
                        <span class="drill-status-chip">${escapeHtml(status)}</span>
                    </div>
                    <div class="drill-card-meta">
                        <span>${escapeHtml(getDrillTypeLabel(drill.type))}</span>
                        <span>${escapeHtml(getGameTypeLabel(drill.gameType))}</span>
                    </div>
                </div>
                <div class="drill-card-actions">
                    <button class="btn-range-action drill-primary-action" onclick="editCustomDrill('${escapeJsArg(drill.id)}')">${escapeHtml(t.drillEdit || 'Edit')}</button>
                    <button class="btn-range-action btn-range-clear drill-secondary-action" onclick="duplicateDrillFromManager('${escapeJsArg(drill.id)}')">${escapeHtml(t.drillDuplicate || 'Duplicate')}</button>
                    <button class="btn-range-action btn-range-clear drill-secondary-action" onclick="exportDrillDefinition('${escapeJsArg(drill.id)}')">${escapeHtml(t.drillExport || 'Export')}</button>
                    <button class="btn-range-action btn-range-delete" onclick="deleteDrillFromManager('${escapeJsArg(drill.id)}')">${escapeHtml(t.drillDelete || 'Delete')}</button>
                </div>
            </div>
        `;
    }).join('');
}

window.exportRange = function () {
    copyRangeCode();
};

window.importRange = function () {
    const t = I18N[state.lang] || I18N.en;
    const raw = prompt(t.rangeCodeImportPrompt || 'Paste range code (PT1.<payload> or 48-character payload) or legacy JSON:');
    if (!raw) return;
    try {
        const trimmed = raw.trim();

        // New format: PT1.<base64url> or bare 48-character payload.
        if (!trimmed.startsWith('{')) {
            const es = decodeRangeCodeToEditorState(trimmed);
            // Apply to editor immediately
            editorState = es;
            state.rangeEditorData = { ...editorState };
            renderEditorGrid();

            // Optionally save as a named custom range
            const defaultName = t.rangeImportedDefaultName || 'Imported Range';
            const promptLabel = t.rangeNameImportPrompt || 'Name this imported range:';
            const name = (prompt(promptLabel, defaultName) || defaultName).trim();
            const raise = Object.keys(editorState).filter(k => editorState[k] === 'raise');
            const call = Object.keys(editorState).filter(k => editorState[k] === 'call');
            state.customRanges[name] = { raise, call };
            saveToStorage();
            refreshRangeDropdown();
            showToast((t.rangeImportedToast || 'Range "{name}" imported.').replace('{name}', name), 'success');
            return;
        }

        // Legacy: JSON payload { name, raise: [...], call?: [...] }
        const data = JSON.parse(trimmed);
        if (!data.name || !data.raise) throw new Error('json');
        state.customRanges[data.name] = { raise: data.raise, call: data.call || [] };
        saveToStorage();
        refreshRangeDropdown();
        showToast((t.rangeImportedToast || 'Range "{name}" imported.').replace('{name}', data.name), 'success');
    } catch (e) {
        showToast(getRangeCodeErrorMessage(e), 'error');
    }
};

// ============================================================
// CHART MODAL (all positions)
// ============================================================
window.renderChartGrid = function () {
    const chartPos = state.chartPosition || 'UTG';
    let range, range3Bet, rangeCall;
    let titleHTML = '', legendHTML = '', gridHTML = '';

    if (state.currentMode === 'ALL_STREET') {
        const scenario = getCurrentAllStreetScenario();
        const t = I18N[state.lang] || I18N.en;
        const board = scenario.boardCards.join(' ');
        const texture = getLocalizedBoardTextureLabels(scenario, t).join(', ');
        const sizes = getLocalizedPostflopSizeLabels(scenario, t).join(', ');
        const wrapper = document.querySelector('#chart-modal .modal-content');
        wrapper.innerHTML = `
            <div class="modal-header"><h2>${escapeHtml(getAllStreetScenarioTitle(scenario, t))}</h2><button class="btn-close" onclick="toggleChartModal()">&times;</button></div>
            <div class="all-street-chart-summary">
                <p><strong>${escapeHtml(t.postflopBoardLabel || 'Board')}:</strong> ${escapeHtml(board)} (${escapeHtml(texture)})</p>
                <p><strong>${escapeHtml(t.postflopLineLabel || 'Line')}:</strong> ${escapeHtml(scenario.previousAction.join(' / '))}</p>
                <p><strong>${escapeHtml(t.postflopPotLabel || 'Pot')}:</strong> ${scenario.potBb}bb / <strong>${escapeHtml(t.postflopStackLabel || 'Stack')}:</strong> ${scenario.effectiveStackBb}bb / <strong>SPR:</strong> ${scenario.spr}</p>
                <p><strong>${escapeHtml(t.postflopSizesLabel || 'Sizes')}:</strong> ${escapeHtml(sizes)}</p>
            </div>`;
        return;
    }

    if (state.currentMode === 'RFI') {
        range = RFI_RANGES[chartPos] || RFI_RANGES.UTG;
        const t = I18N[state.lang] || I18N.en;
        const posLabel = (t.chartRfiTitle || '{position} RFI open range').replace('{position}', chartPos);
        titleHTML = `<div class="modal-header"><h2>${posLabel}</h2><button class="btn-close" onclick="toggleChartModal()">&times;</button></div>`;
        legendHTML = `<div class="chart-legend"><div class="legend-item"><span class="color-box raise"></span>${I18N[state.lang].legendRaise}</div><div class="legend-item"><span class="color-box fold"></span>${I18N[state.lang].legendFold}</div></div>`;
    } else if (state.currentMode === 'PUSH_FOLD') {
        const t = I18N[state.lang] || I18N.en;
        const pRanges = PUSH_RANGES_BY_STACK[state.currentStack] || PUSH_10BB;
        range = pRanges[chartPos] || pRanges.UTG;
        const posLabel = (t.chartPushTitle || '{position} {stack}bb push range')
            .replace('{position}', chartPos)
            .replace('{stack}', state.currentStack);
        titleHTML = `<div class="modal-header"><h2>${posLabel}</h2><button class="btn-close" onclick="toggleChartModal()">&times;</button></div>`;
        legendHTML = `<div class="chart-legend"><div class="legend-item"><span class="color-box raise"></span>${t.legendPush || 'Push'}</div><div class="legend-item"><span class="color-box fold"></span>${I18N[state.lang].legendFold}</div></div>`;
    } else if (state.currentMode === 'DEFEND') {
        const t = I18N[state.lang] || I18N.en;
        const sc = DEFEND_SCENARIOS[state.currentDefendScenario] || DEFEND_SCENARIOS.BTN_VS_CO;
        range3Bet = sc.THREE_BET; rangeCall = sc.CALL || new Set();
        const posLabel = (t.chartDefenseTitle || '{hero} vs {villain} defense')
            .replace('{hero}', sc.hero)
            .replace('{villain}', sc.villain);
        titleHTML = `<div class="modal-header"><h2>${posLabel}</h2><button class="btn-close" onclick="toggleChartModal()">&times;</button></div>`;
        legendHTML = `<div class="chart-legend"><div class="legend-item"><span class="color-box raise"></span>3-Bet</div><div class="legend-item" style="display:flex;align-items:center;gap:5px"><div style="width:14px;height:14px;background:#3182ce;border-radius:4px"></div>${I18N[state.lang].legendCall}</div><div class="legend-item"><span class="color-box fold"></span>${I18N[state.lang].legendFold}</div></div>`;
    } else if (state.currentMode === 'CUSTOM') {
        const drill = getActiveCustomDrill();
        if (drill && drill.type === DRILL_TYPES.ALL_STREET) {
            const scenario = buildCustomAllStreetScenario(drill);
            const t = I18N[state.lang] || I18N.en;
            const board = scenario.boardCards.join(' ');
            const texture = getLocalizedBoardTextureLabels(scenario, t).join(', ');
            const sizes = getLocalizedPostflopSizeLabels(scenario, t).join(', ');
            titleHTML = `<div class="modal-header"><h2>${escapeHtml(getAllStreetScenarioTitle(scenario, t))}</h2><button class="btn-close" onclick="toggleChartModal()">&times;</button></div>`;
            const wrapper = document.querySelector('#chart-modal .modal-content');
            wrapper.innerHTML = titleHTML + `
                <div class="all-street-chart-summary">
                    <p><strong>${escapeHtml(t.postflopBoardLabel || 'Board')}:</strong> ${escapeHtml(board)} (${escapeHtml(texture)})</p>
                    <p><strong>${escapeHtml(t.postflopLineLabel || 'Line')}:</strong> ${escapeHtml(scenario.previousAction.join(' / '))}</p>
                    <p><strong>${escapeHtml(t.postflopPotLabel || 'Pot')}:</strong> ${scenario.potBb}bb / <strong>${escapeHtml(t.postflopStackLabel || 'Stack')}:</strong> ${scenario.effectiveStackBb}bb / <strong>SPR:</strong> ${scenario.spr}</p>
                    <p><strong>${escapeHtml(t.postflopSizesLabel || 'Sizes')}:</strong> ${escapeHtml(sizes)}</p>
                </div>`;
            return;
        } else if (drill && drill.type === DRILL_TYPES.FACING_3BET) {
            const t = I18N[state.lang] || I18N.en;
            range3Bet = rangeCodeToPlayableSet(drill.ranges.raise);
            rangeCall = rangeCodeToPlayableSet(drill.ranges.call);
            const previewTitle = (t.chartRangePreviewTitle || '{name} range preview').replace('{name}', drill.name);
            titleHTML = `<div class="modal-header"><h2>${escapeHtml(previewTitle)}</h2><button class="btn-close" onclick="toggleChartModal()">&times;</button></div>`;
            legendHTML = `<div class="chart-legend"><div class="legend-item"><span class="color-box raise"></span>${I18N[state.lang].legendRaise}</div><div class="legend-item" style="display:flex;align-items:center;gap:5px"><div style="width:14px;height:14px;background:#3182ce;border-radius:4px"></div>${I18N[state.lang].legendCall}</div><div class="legend-item"><span class="color-box fold"></span>${I18N[state.lang].legendFold}</div></div>`;
        } else {
            const t = I18N[state.lang] || I18N.en;
            const custom = state.customRanges[state.currentCustomRangeName];
            range3Bet = new Set(custom ? custom.raise || [] : []);
            rangeCall = new Set(custom ? custom.call || [] : []);
            titleHTML = `<div class="modal-header"><h2>${escapeHtml(state.currentCustomRangeName || t.chartCustomRangeTitle || 'Custom range')}</h2><button class="btn-close" onclick="toggleChartModal()">&times;</button></div>`;
            legendHTML = `<div class="chart-legend"><div class="legend-item"><span class="color-box raise"></span>${I18N[state.lang].legendRaise}</div><div class="legend-item" style="display:flex;align-items:center;gap:5px"><div style="width:14px;height:14px;background:#3182ce;border-radius:4px"></div>${I18N[state.lang].legendCall}</div><div class="legend-item"><span class="color-box fold"></span>${I18N[state.lang].legendFold}</div></div>`;
        }
    }

    const currentCombo = state.currentHand ? getComboName(state.currentHand) : null;
    for (let r1 of CHART_RANKS) {
        for (let r2 of CHART_RANKS) {
            const i1 = CHART_RANKS.indexOf(r1), i2 = CHART_RANKS.indexOf(r2);
            const isPair = i1 === i2, isSuited = i2 > i1;
            const high = i1 <= i2 ? r1 : r2, low = i1 <= i2 ? r2 : r1;
            const name = isPair ? `${high}${low}` : `${high}${low}${isSuited ? 's' : 'o'}`;
            const isCurrent = name === currentCombo;
            let bg;
            if (state.currentMode === 'DEFEND' || state.currentMode === 'CUSTOM') {
                bg = range3Bet.has(name) ? 'raise' : (rangeCall.has(name) ? 'defend-call' : 'fold');
            } else {
                bg = range && range.has(name) ? 'raise' : 'fold';
            }
            gridHTML += `<div class="chart-cell ${bg}${isCurrent ? ' highlight' : ''}">${name}</div>`;
        }
    }

    // Position selector tabs for non-defend modes
    let posSelector = '';
    if (state.currentMode !== 'DEFEND' && state.currentMode !== 'CUSTOM') {
        posSelector = `<div class="chart-pos-tabs">${['UTG', 'HJ', 'CO', 'BTN', 'SB'].map(p =>
            `<button class="chart-pos-btn${p === chartPos ? ' active' : ''}" onclick="setChartPosition('${p}')">${p}</button>`
        ).join('')}</div>`;
    }

    const wrapper = document.querySelector('#chart-modal .modal-content');
    wrapper.innerHTML = `${titleHTML}<div class="modal-body chart-modal-body">${posSelector}<div id="chart-grid" class="chart-grid">${gridHTML}</div>${legendHTML}</div>`;
};

window.setChartPosition = function (pos) {
    state.chartPosition = pos;
    renderChartGrid();
};

window.toggleChartModal = function () {
    if (chartModalEl.classList.contains('hidden')) {
        renderChartGrid();
        chartModalEl.classList.remove('hidden');
    } else {
        chartModalEl.classList.add('hidden');
    }
};

window.toggleInfoModal = function () {
    const opening = infoModalEl.classList.contains('hidden');
    infoModalEl.classList.toggle('hidden');
    if (opening) setInfoModalPage('rules');
};

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', function (e) {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

    // Skip if any modal is open (except feedback)
    const activeModals = document.querySelectorAll('.modal:not(.hidden)');
    if (activeModals.length > 0) return;

    if (!feedbackEl.classList.contains('hidden')) {
        if (e.code === 'Enter') { e.preventDefault(); nextHand(); }
        return;
    }
    if (!state.currentHand) return;
    const isVisible = element => element && !element.classList.contains('hidden');
    const t = I18N[state.lang] || I18N.en;
    const checkLabel = t.postflopActionCheck || 'Check';
    const foldButtonLabel = (btnFoldEl && (btnFoldEl.innerText || btnFoldEl.textContent || '')).trim();
    if (e.code === 'KeyC' && isVisible(btnFoldEl) && foldButtonLabel === checkLabel) {
        e.preventDefault();
        handleAction('Fold');
    } else if (e.code === 'Space' && isVisible(btnFoldEl) && foldButtonLabel !== checkLabel) {
        e.preventDefault();
        handleAction('Fold');
    } else if (e.code === 'KeyM' && isVisible(btnCallEl)) {
        e.preventDefault();
        handleAction('Call');
    } else if (e.code === 'Enter' && isVisible(btnRaiseEl)) {
        e.preventDefault();
        handleAction('Raise');
    }
});

// ============================================================
// LANGUAGE TOGGLE
// ============================================================
window.setLanguage = function (lang) {
    const nextLang = normalizeLanguage(lang);
    if (!nextLang || nextLang === state.lang) {
        syncLanguageControls();
        return;
    }
    const firstRunAnswers = shouldShowFirstRunFlow() ? getFirstRunAnswers() : null;
    state.lang = nextLang;
    saveToStorage();
    applyStaticI18n();
    renderAssessmentRecommendation();
    updateRangeCodePanel();
    previewRangeCodeInput();
    renderDrillManagerList();
    changeMode(state.currentMode, true, { preserveTurn: true });
    renderPersonalizedDashboard();
    if (typeof window.renderAppShell === 'function') window.renderAppShell();
    if (firstRunAnswers) populateFirstRunForm(firstRunAnswers);
    syncLanguageControls();
};

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialise element references
    initElements();

    // 2. Load state
    loadFromStorage();

    // 3. Apply static i18n
    applyStaticI18n();

    // 4. Start first hand
    changeMode('RFI');
    renderAppShell();

    // 5. Update stats
    if (lifetimeHandsEl) lifetimeHandsEl.innerText = state.stats.totalHands;

    // 6. Restore accuracy HUD
    if (accuracyHudEl && state.stats.totalHands > 0) {
        const pct = Math.round((state.stats.totalCorrect / state.stats.totalHands) * 100);
        accuracyHudEl.innerText = pct + '%';
        accuracyHudEl.style.color = pct >= 70 ? 'var(--color-raise)' : pct >= 50 ? '#f6ad55' : 'var(--color-fold)';
    }

    // 7. Range dropdown init
    refreshRangeDropdown();

    // 8. Assessment preview reacts immediately to questionnaire edits
    ASSESSMENT_FIELDS.forEach(field => {
        const id = `assessment-${field.replace(/[A-Z]/g, ch => `-${ch.toLowerCase()}`)}-select`;
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', () => {
            renderAssessmentRecommendation();
            renderPersonalizedDashboard();
        });
    });
});

function applyStaticI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const langData = I18N[state.lang];
        if (langData && typeof langData[key] === 'string') {
            el.innerHTML = langData[key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const langData = I18N[state.lang];
        if (langData && typeof langData[key] === 'string') {
            el.setAttribute('placeholder', langData[key]);
        }
    });
    renderPokerGlossary();
    setInfoModalPage(document.getElementById('info-glossary-page')?.classList.contains('hidden') === false ? 'glossary' : 'rules');
}
