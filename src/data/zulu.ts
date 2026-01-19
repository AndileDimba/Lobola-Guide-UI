import type { NationData } from "./types";

export const zuluData: NationData = {
  id: "zulu",
  nationName: "Zulu (AmaZulu)",
  theme: {
    primary: "bg-white",
    headerBg: "bg-white",
    accent: "text-yellow-600",
    border: "border-yellow-600",
    ring: "ring-yellow-100",
    button: "bg-yellow-600 hover:bg-yellow-700 text-white",
    iconColor: "#ca8a04", // Gold
  },
  steps: [
    {
      id: "sending_of_the_letter",
      title: "Sending of the Letter",
      description:
        "Insizwa ithumela incwadi esuka kubo kwayo ihambise kubo kwentombi, leyoncwadi iqukethe isicelo sokuba umndeni wakubo kwensizwa uyafisa ukuza uzocela isihlobo esisha.",
      details: [
        "Incwadi iqukethe isicelo sokuba umndeni wakubo kwensizwa uyafisa ngosuku oluthile ukuza uzocela isihlobo esisha kulowomuzi wakubo kwentombi.",
        "Uma bevuma kubo kwentombi, kuba yilo usuku lolo lokuvakasha.",
      ],
    },
    {
      id: "choosing_negotiators",
      title: "Choosing Negotiators (Uncles)",
      description:
        "Ngaphambi kokuthi kuhanjiwe, kukhethwa abakhongi abazoya ukuyocela isihlobo esihle, kuhlanganisa umkhongi omkhulu, umkhongi omncane (omphelezeli), intokazi eyodwa noma ezimbili, kanye nonobhala.",
      details: [
        "Umkhongi omkhulu, umkhongi omncane (omphelezeli) bakhethwa.",
        "Intokazi eyodwa noma ezimbili zikhethwa ukuze ziphethe izipho zikamakoti.",
        "Unobhala ubhala konke okwenzekayo kulosuku.",
      ],
    },
    {
      id: "negotiations_day_umcelo",
      title: "Negotiations Day (Umcelo)",
      description:
        "Ngosuku olubekiwe, abakhongi bayavuka ekuseni baya esangweni lakubo kwentombi, babize izithakazelo, bese beqala izinkulumo zokucela isihlobo.",
      details: [
        'Bafika esangweni, babize izithakazelo zabo, bethi "sikhulekile ekhaya kwanozibanibani asizile ngempi sizocela isihlobo esihle".',
        "Kujwayelekile ukuthi banganakwa isikhathi eside kuze kube bavulelwa esangweni.",
        "Kuthunyelwa ingane ivule isango bese ihlala noma ilale phambi kwalo.",
        "Abakhongi bakhipha izipho noma imali ukuze ingane ivulele indlela.",
        "Babuza ukuthi balethwa yini, ubaba kamakoti uthule kuze kukhishwe imvulamlomo (izipho).",
        "Bamemeza ngezinkomo ezithile nezithile, bachaza uhlobo lwezinkomo.",
        "Kukhulunywa ngezinkomo zamalobolo, amanani azo, nezibizo zikamama nesikababa.",
        "Umkhosi uqeda usuku, umakoti engena ehamba nezinye izintombi embozile, abakubo kwensizwa bamkhethe phakathi kwezinye izintombi.",
        "Kucelwa incwadi yezibizo noma kuvunyelwane ukuthi kuzoqalwa ngezibizo noma kuqalwe ngamalobolo.",
      ],
    },
    {
      id: "gifting_of_bride_family_umembeso",
      title: "Gifting of Bride Family (Umembeso)",
      description:
        "Okulandelayo kube ngoshukela (ezinye izindawo zibiza ngezikhwehlela), abanye bakuhlanganisa nomembeso noma ngezibizo.",
      details: [
        "Umama kamkhwenyana uletha umbondo wezipho nezimpahla ezibhalwe encwadini yezibizo.",
        "Kukhona nembuzi ebizwa ngobikibiki.",
        "Abanye bahlaba imbuzi behlabela umkhwenyana ukuze adle kulomuzi uma engenile.",
        "Umkhwenyana uhamba nezinsizwa aye kubo kamakoti, bangena emuva komama abeletha izibizo.",
        "Umkhwenyana akadli imbuzi engakanikwa.",
        "Kuhlanganiswa nomemulo lapho intombi ikhuliswe khona, iyosina esigcawini ngomkhonto owulandwa kwensizwa.",
        "Umemulo unesigcawu, isikhathi siyahlukahluka ngezigodi.",
        "Kuyabuyelwa ekhaya lapho intombi ikhehlwa khona endlini ifakwe insoyi noma inkehli ekhanda.",
        "Umkhehlo wenziwa ngembuzi.",
      ],
    },
    {
      id: "ukubonwa_kwezinkomo",
      title:
        "Ukubonwa Kwezinkomo (Bride Family Going to See Cows at Groom's Home)",
      description:
        "Emuva kwalomcimbi, abakwamakoti bafuna ukuqala ngezinkomo noma ngezibizo, kuvunyelwane ngezinkomo zamalobolo, amanani, nezinsuku zokuhanjiswa.",
      details: [
        "Abakwamakoti babizwa bezobona izinkomo zamalobolo.",
        "Kukhishwa usuku lokuthi izinkomo zizohanjiswa nini kubo kamakoti.",
      ],
    },
    {
      id: "makoti_delivers_gift_umbondo",
      title: "Makoti Delivers Gift (Umbondo)",
      description:
        "Ngemva kokuhanjiswa kwezinkomo, umakoti uhamba nezintombi ezimbozile ukuhambisa umbondo noma ingqibamasondo kubo kamkhwenyana.",
      details: [
        "Umbondo uhanjiswa ebusuku, kuvame ukuhambisana nomshado.",
        "Umbondo uqukethe ukudla okuningi nezinto ezibalulekile.",
      ],
    },
    {
      id: "wedding_day_umabo_umshado",
      title: "Wedding Day (Umabo/Umshado)",
      description:
        "Kukhishwa usuku lomshado, umakoti nozakwabo bahamba nomkhosi, kwenziwa imicimbi yesiko, kuhlanganisa ukucula, ukudansa, nokuvuma umthetho womshado.",
      details: [
        "Kukhishwa usuku kubo kamakoti ukuthi ngosuku oluthile sizonilethela intombi eseniyilobolile naqeda ukuzofeza noma ukuzoqedela ubuhlobo obuhle obakhiwayo.",
        "Kuvunyelwane bese kubo kamakoti kuphume umthimba okungabantu abahamba ezintathakusa kanye nomakoti.",
        'Umthimba ufika kusalelwe kubo kamkhwenyana, bangene nomakoti kukhuzwe umntwana kuthiwa "uphi umntwana".',
        "Abantu bomthimba bagijima beshaya izindlu.",
        "Kwenziwa usiko lwakhona, bese bephuma bekhonjiswa isihlahla ngaphandle komuzi, lapho bezohlalakhona usuku lonke nomakoti aze avunule.",
        "Umakoti uya esigcawini esikhonjwe abakwamkhwenyana, lapho ezosina khona.",
        "Kufike amabutho endawo azodabula isigcawu ephethe amahawu ekhuza izaga.",
        'Iphoyisa lenkosi libuza ukuthi "Makoti (amubize ngegama lakhe) uyabuza umthetho x3, uyamuthanda na umkhwenyana (amubize ngegama nesibongo)?"',
        "Umakoti eqamba icule acule asine aze afike ephoyiseni alinike icansi, eliphethe okukhombisa ukuvuma ukuthi uyamthanda.",
        "Ngaphambi kokuthi kuze kuyiwe esigcawini, ekuseni kuhlatshwe inkomo kubo kamkhwenyana.",
        "Umakoti uyangena esibayeni azobhobosa isisu senkomo, kwenziwe nolunye usiko kanjalo kanjalo.",
        "Uma sekubuyiwe esigcawini, umakoti uyaba (umabo), aphe izipho okuyizingubo, amacansi, amaphinifa, nayo yonke into enikazi abantu basemzini.",
        "Lokhu kwenzelwa esibayeni, bese emuva kwalokho umshado usuphelele, sekuyadliwa bayaphuza abaphuzayo kuze kuphele usuku.",
      ],
    },
  ],
};
