export const profileMenuElements = [
  [
    {
      name: "View Profile",
      route: (id) => {
        return `${id}/profile`;
      },
      id: "123",
      iconSVG:
        "M14.766662109375 13.707755859374998c-1.0753125000000001 -1.85902734375 -2.7324140625 -3.192046875 -4.666283203125 -3.823962890625 3.36258984375 -2.0017734375000003 3.2972226562499998 -6.8929921875 -0.11765625 -8.804191406249998C6.56784375 -0.83159765625 2.364609375 1.670619140625 2.4168984375 5.583591796875c0.023619140625 1.767568359375 0.9637734375 3.395958984375 2.48272265625 4.300201171875 -1.933869140625 0.63120703125 -3.59096484375 1.9642265624999997 -4.666283203125 3.823962890625 -0.227326171875 0.370658203125 0.031845703125 0.84840234375 0.466505859375 0.8599453125 0.212390625 0.005642578125 0.40998632812499997 -0.10838671875 0.511376953125 -0.295107421875C2.541416015625 11.973697265625 4.892560546875 10.601138671874999 7.5 10.601138671874999s4.958583984374999 1.37255859375 6.2887851562499995 3.671455078125c0.207486328125 0.38211914062499996 0.7508144531250001 0.39632812500000003 0.9779941406249999 0.025582031249999998 0.11101171875 -0.18116601562499998 0.11096484375 -0.40930078125 -0.0001171875 -0.5904199218749999ZM3.546123046875 5.517580078125c0 -3.043693359375 3.294896484375 -4.94600390625 5.9308125 -3.424154296875 2.635921875 1.521849609375 2.635921875 5.32646484375 0 6.848314453125 -0.601060546875 0.34702734375 -1.28288671875 0.529716796875 -1.976935546875 0.529716796875 -2.18269921875 -0.00233203125 -3.9515390624999998 -1.7711777343750001 -3.953876953125 -3.953876953125Z",
      lineDown: true,
    },
  ],
  [
    {
      name: "Watchlist",
      route: (id) => {
        return `${id}/watchlist`;
      },
      id: "456",
      iconSVG:
        "M11.61608203125 0.15H3.38391796875c-0.6495 0 -1.1760234374999998 0.5265234375000001 -1.1760234374999998 1.1760234374999998v12.9362578125c0.00022851562499999999 0.4526484375 0.49037695312499996 0.73531640625 0.88226953125 0.50879296875 0.005859375 -0.00338671875 0.011654296875 -0.0068671875 0.017390625 -0.010453125L7.5 12.01533984375l4.39318359375 2.74528125c0.38419921875 0.239337890625 0.88341796875 -0.026982421875000002 0.89859375 -0.47937890625 0.0002109375 -0.00631640625 0.00032226562499999996 -0.012638671875 0.000328125 -0.0189609375V1.3260234375c0 -0.6495 -0.5265234375000001 -1.1760234374999998 -1.1760234374999998 -1.1760234374999998Zm0 13.05165234375 -3.8051718749999996 -2.37776953125c-0.19067578125 -0.119173828125 -0.432615234375 -0.119173828125 -0.623291015625 0l-3.803701171875 2.37776953125V1.3260234375h8.232164062499999Z",
      lineDown: false,
    },
    {
      name: "Lists",
      route: (id) => {
        return `${id}/lists`;
      },
      id: "789",
      iconSVG:
        "M3.825 2.599998046875c0 -0.33828515625 0.274212890625 -0.612515625 0.612498046875 -0.612498046875h9.80000390625c0.4714980468750001 0.0000234375 0.7661953125 0.510451171875 0.53042578125 0.9187734375000001 -0.10941796875 0.18949804687500002 -0.31161328125 0.30622851562500003 -0.53042578125 0.30622851562500003H4.437498046875c-0.33828515625 0.00001171875 -0.612498046875 -0.27421874999999996 -0.612498046875 -0.6125039062500001Zm10.412501953125 4.28750390625H4.437498046875c-0.4714980468750001 -0.0000234375 -0.76618359375 0.510380859375 -0.530455078125 0.9187265625000001 0.109412109375 0.18952148437500002 0.311625 0.30626953125 0.530455078125 0.30626953125h9.80000390625c0.4714980468750001 0 0.766189453125 -0.510416015625 0.5304375 -0.91875 -0.10940625 -0.18949804687500002 -0.311625 -0.306240234375 -0.5304375 -0.30624609375Zm0 4.89999609375H4.437498046875c-0.4714980468750001 0 -0.766189453125 0.510416015625 -0.5304375 0.91875 0.109412109375 0.18950976562500002 0.31161328125 0.30625195312500003 0.5304375 0.30625195312500003h9.80000390625c0.4714980468750001 -0.0000234375 0.7661953125 -0.510451171875 0.53042578125 -0.9187734375000001 -0.10941796875 -0.1894921875 -0.31161328125 -0.30622851562500003 -0.53042578125 -0.30622851562500003ZM1.0687499999999999 1.681248046875C0.361494140625 1.68121875 -0.08053125 2.446822265625 0.2730703125 3.0593378906249997c0.353595703125 0.612515625 1.2376640625000002 0.612556640625 1.591318359375 0.0000703125 0.080654296875 -0.13967578125 0.12311132812500002 -0.298119140625 0.12311132812500002 -0.45941015625000003 0 -0.5074101562500001 -0.41133984375 -0.91875 -0.91875 -0.91875Zm0 4.900001953125c-0.7072558593749999 0 -1.149287109375 0.7656269531250001 -0.795662109375 1.378125 0.353630859375 0.612498046875 1.2376933593750001 0.612498046875 1.59132421875 0 0.08063671875 -0.13966992187500002 0.12308789062499999 -0.29810156250000003 0.12308789062499999 -0.459375 0 -0.5074101562500001 -0.41133984375 -0.91875 -0.91875 -0.91875Zm0 4.900001953125c-0.7072558593749999 0 -1.149287109375 0.76562109375 -0.795662109375 1.378125 0.353630859375 0.612498046875 1.2376933593750001 0.612498046875 1.59132421875 0 0.08063671875 -0.13966992187500002 0.12308789062499999 -0.29810156250000003 0.12308789062499999 -0.459375 0 -0.5074101562500001 -0.41133984375 -0.91875 -0.91875 -0.91875Z",
      lineDown: false,
    },
    {
      name: "Likes",
      route: (id) => {
        return `${id}/likes`;
      },
      id: "369",
      iconSVG:
        "M13.736080078125001 2.316896484375c-1.4847421875 -1.48102734375 -3.8871386718750003 -1.483962890625 -5.3754902343749995 -0.0065625l-0.858298828125 0.797267578125 -0.85894921875 -0.799892578125C4.568759765625 0.23893359375 1.032626953125 1.1917558593750002 0.27830859375 4.022783203125c-0.3500859375 1.313888671875 0.027380859375 2.714736328125 0.9901992187499999 3.674853515625l5.863037109375 5.949005859375c0.205640625 0.208810546875 0.5424199218750001 0.208810546875 0.7480546875 0l5.85648046875 -5.949005859375c1.485228515625 -1.486107421875 1.485228515625 -3.8946328125000003 0 -5.380740234375Zm-0.7447734375 4.643185546875 -5.4890156249999995 5.567103515625 -5.492291015625 -5.572353515625C0.509748046875 5.4545859375 1.1961621093750001 2.8928671875000003 3.2455371093750003 2.34373828125c0.9511171875 -0.25485351562499997 1.96594921875 0.017068359375 2.66221875 0.7133378906250001l0.013125 0.013125 1.2237890624999999 1.13848828125c0.20153320312499998 0.187546875 0.51371484375 0.187546875 0.7152421875 0l1.223794921875 -1.13848828125 0.013125 -0.013125c1.50125390625 -1.49923828125 4.0625156250000005 -0.8111015625 4.6102617187499995 1.2386425781250001 0.254208984375 0.9512929687499999 -0.018392578125 1.9659433593750002 -0.715130859375 2.66173828125Z",
      lineDown: true,
    },
  ],
  [
    {
      name: "Settings",
      route: (id) => {
        return `${id}/settings`;
      },
      id: "852",
      iconSVG:
        "M7.50062109375 4.3501699218750005c-2.4246972656250003 0 -3.940130859375 2.6248125 -2.72778515625 4.724660156250001 1.2123515624999999 2.099853515625 4.24321875 2.099853515625 5.4555703125 0 0.276451171875 -0.4788222656250001 0.42198632812500003 -1.0219863281250001 0.42198632812500003 -1.5748828125 -0.0018046875 -1.7388222656249999 -1.4109492187500001 -3.147966796875 -3.149771484375 -3.14977734375Zm0 5.249625c-1.6164609374999999 0 -2.6267519531250003 -1.749873046875 -1.8185214843750002 -3.149771484375 0.8082304687499999 -1.3998984375 2.8288124999999997 -1.3998984375 3.6370429687500003 0 0.18430078125 0.31921289062499997 0.28132617187500003 0.681322265625 0.28132617187500003 1.049923828125 0 1.1597109375 -0.940130859375 2.09984765625 -2.09984765625 2.09984765625Zm7.214296875 -3.4640976562500003c-0.02958984375 -0.149578125 -0.12275390625000002 -0.27890624999999997 -0.255263671875 -0.354345703125l-1.9574531250000002 -1.115548828125 -0.007875 -2.2061484375c-0.00048046875000000005 -0.1537734375 -0.06836132812500001 -0.2996015625 -0.18570703125 -0.39897656249999996 -0.710056640625 -0.6006210937500001 -1.5277441406249999 -1.060904296875 -2.40957421875 -1.356369140625 -0.140431640625 -0.047531250000000004 -0.29441015625 -0.033468750000000005 -0.423908203125 0.03871875l-1.974515625 1.10373046875 -1.976484375 -1.1056992187499999c-0.12957421875 -0.07259765625 -0.28383984375 -0.086900390625 -0.42455859375 -0.039375 -0.881185546875 0.29762695312500004 -1.6979355468750001 0.759662109375 -2.4069550781249998 1.361619140625 -0.117169921875 0.099228515625 -0.18503320312500002 0.244775390625 -0.18570703125 0.3983203125l-0.00984375 2.2081171875L0.539619140625 5.7852890625c-0.132509765625 0.075439453125 -0.225673828125 0.204767578125 -0.2552578125 0.354345703125 -0.17915039062500002 0.900234375 -0.17915039062500002 1.826947265625 0 2.727181640625 0.029583984375 0.149583984375 0.122748046875 0.27891210937500005 0.2552578125 0.3543515625l1.9574531250000002 1.11554296875 0.007875 2.206154296875c0.000486328125 0.153767578125 0.06836132812500001 0.299595703125 0.18570703125 0.398970703125 0.710056640625 0.6006210937500001 1.5277441406249999 1.060904296875 2.40957421875 1.356369140625 0.140431640625 0.047537109375000004 0.294416015625 0.033468750000000005 0.423908203125 -0.038712890624999996l1.976484375 -1.1063613281250002 1.976484375 1.105705078125c0.078216796875 0.04358203125 0.1663828125 0.0661875 0.255919921875 0.06561914062499999 0.057333984375 -0.000017578125 0.114287109375 -0.009328125 0.16864453125 -0.0275625 0.881080078125 -0.297228515625 1.69782421875 -0.758818359375 2.40694921875 -1.3603066406250002 0.11717578125 -0.09922265625 0.18503320312500002 -0.244775390625 0.18570703125 -0.398314453125l0.00984375 -2.208123046875 1.9574531250000002 -1.11554296875c0.132509765625 -0.075439453125 0.225673828125 -0.204767578125 0.255263671875 -0.3543515625 0.1781484375 -0.899513671875 0.177474609375 -1.8253007812500002 -0.00196875 -2.724556640625Zm-0.9843046875 2.2908046875 -1.8747714843749999 1.066330078125c-0.08214257812499999 0.0467109375 -0.150158203125 0.114720703125 -0.19686328125 0.19686328125 -0.038056640625 0.06561914062499999 -0.078087890625 0.13517578125 -0.11876953125 0.20079492187499998 -0.052078125 0.082751953125 -0.079822265625 0.17848828125 -0.08005664062500001 0.276263671875l-0.00984375 2.1162539062500003c-0.50391796875 0.39572460937500004 -1.0653222656249999 0.7121660156249999 -1.6647890625000001 0.9383671875l-1.891177734375 -1.053861328125c-0.078509765625 -0.043441406249999995 -0.16684570312500002 -0.066029296875 -0.256576171875 -0.06561914062499999h-0.251326171875c-0.093908203125 -0.00234375 -0.186755859375 0.020302734375 -0.2690390625 0.06561914062499999l-1.8924902343749999 1.0564863281249999c-0.600744140625 -0.224466796875 -1.1636953124999998 -0.53935546875 -1.6693828125 -0.9337734375000001l-0.007212890625 -2.1129726562499997c-0.000328125 -0.09796875 -0.0280546875 -0.193892578125 -0.08005664062500001 -0.276919921875 -0.0406875 -0.06561914062499999 -0.08071289062499999 -0.13123828124999998 -0.118119140625 -0.20079492187499998 -0.046376953125 -0.0834140625 -0.11438671874999999 -0.15277734375000002 -0.19686328125 -0.20080078125l-1.876740234375 -1.0689550781250001c-0.097119140625 -0.614326171875 -0.097119140625 -1.2401015625 0 -1.854427734375l1.871490234375 -1.0682988281249999c0.08214257812499999 -0.046705078125 0.150158203125 -0.114720703125 0.19686328125 -0.196857421875 0.038056640625 -0.065625 0.078087890625 -0.13518164062500002 0.11876953125 -0.20080078125 0.052083984375 -0.082751953125 0.079822265625 -0.17848828125 0.08005664062500001 -0.276263671875l0.00984375 -2.1162539062500003c0.50391796875 -0.39572460937500004 1.0653222656249999 -0.71216015625 1.6647890625000001 -0.9383671875l1.888552734375 1.053861328125c0.082189453125 0.0455625 0.175107421875 0.06822070312499999 0.269044921875 0.06561914062499999h0.238857421875c0.093908203125 0.0023496093749999997 0.186755859375 -0.020296875 0.2690390625 -0.06561914062499999l1.8924902343749999 -1.0564863281249999c0.60075 0.22447265624999999 1.1636953124999998 0.53935546875 1.6693828125 0.9337734375000001l0.00721875 2.112978515625c0.00032226562499999996 0.097962890625 0.0280546875 0.19388671875000002 0.08005664062500001 0.2769140625 0.040681640625 0.06561914062499999 0.08071289062499999 0.131244140625 0.11811328125000001 0.20080078125 0.046376953125 0.083408203125 0.11438671874999999 0.15277734375000002 0.19686328125 0.20079492187499998l1.876740234375 1.0689550781250001c0.0984140625 0.6148007812499999 0.099521484375 1.241255859375 0.00328125 1.856396484375Z",
      lineDown: false,
    },
    {
      name: "Sign out",
      route: () => {
        return "/";
      },
      id: "741",
      iconSVG:
        "M6.274798828125 14.237279296875c0 0.33826171875 -0.27421874999999996 0.61248046875 -0.61248046875 0.61248046875H0.76248046875c-0.33826171875 0 -0.61248046875 -0.27421874999999996 -0.61248046875 -0.61248046875V0.762720703125c0 -0.33826171875 0.27421874999999996 -0.61248046875 0.61248046875 -0.61248046875h4.899837890625c0.47148632812499996 0 0.7661660156250001 0.5103984375 0.53042578125 0.9187207031250001 -0.109412109375 0.18950390625 -0.311607421875 0.306240234375 -0.53042578125 0.306240234375H1.3749609375v12.24959765625h4.287357421875c0.33826171875 0 0.61248046875 0.27421874999999996 0.61248046875 0.61248046875Zm8.3955703125 -7.170609375 -3.06240234375 -3.062396484375c-0.33357421875 -0.333580078125 -0.903169921875 -0.180955078125 -1.025267578125 0.274716796875 -0.056666015624999996 0.21148242187500002 0.003796875 0.437126953125 0.15860742187500002 0.5919375l2.017359375 2.016591796875H5.662318359375c-0.47148632812499996 0 -0.7661660156250001 0.5103984375 -0.530419921875 0.9187207031250001 0.10940625 0.18950390625 0.3116015625 0.306240234375 0.530419921875 0.306240234375h7.09634765625l-2.017359375 2.016591796875c-0.33357421875 0.33357421875 -0.180955078125 0.903169921875 0.27472265625000003 1.025267578125 0.2114765625 0.056666015624999996 0.437126953125 -0.003796875 0.5919375 -0.15861328125l3.06240234375 -3.062396484375c0.2395078125 -0.239244140625 0.2395078125 -0.627416015625 0 -0.86666015625Z",
      lineDown: false,
    },
  ],
];

export const messageIconSvg = [
  {
    fill: "#020202",
    d: "M23.9968 2.48631c0.0025 -0.48421 -0.176 -0.95187 -0.5005 -1.31128 -0.3001 -0.17334 -0.6322 -0.284003 -0.9763 -0.325295 -0.3441 -0.041292 -0.693 -0.012354 -1.0256 0.085062 -1.2214 0.269413 -2.4276 0.603543 -3.6135 1.000973 -0.6106 0.18018 -1.2112 0.39038 -1.8018 0.62061 -0.8808 0.33032 -1.7417 0.71069 -2.6125 1.09106 -1.6025 0.69979 -3.1662 1.48501 -4.68458 2.35229 -1.52342 0.85752 -2.95844 1.86337 -4.28417 3.00292L1.06451 12.0756l-0.790774 0.7908c-0.097554 0.1023 -0.1816476 0.2167 -0.2502433 0.3403 -0.03132358 0.0874 -0.03132358 0.1829 0 0.2703 0.0205099 0.1099 0.0677681 0.213 0.1375993 0.3003 0.069831 0.0873 0.160086 0.1561 0.26279 0.2002 0.386736 0.132 0.792518 0.1996 1.201168 0.2002 0.44043 0 1.22119 0 1.89184 0.1001 0.33918 -0.0102 0.67763 0.0372 1.00098 0.1401l0.19018 2.2322c0.06006 0.6406 0.09009 1.1411 0.09009 1.6116 0 0.7507 -0.1001 2.052 -0.1001 3.0729 0 0.0903 0.03586 0.1769 0.09968 0.2407 0.06383 0.0638 0.15039 0.0997 0.24065 0.0997s0.17683 -0.0359 0.24065 -0.0997c0.06383 -0.0638 0.09968 -0.1504 0.09968 -0.2407 0 -1.0009 0.13013 -2.3222 0.14014 -3.0729 0 -0.4905 0 -1.001 -0.07007 -1.6717 -0.07007 -0.6706 -0.07007 -1.5114 -0.15014 -2.0019 -0.08008 -0.4905 -0.09009 -0.7608 -1.34131 -1.001 -0.74072 -0.0901 -1.76171 -0.1401 -2.31225 -0.1702l-0.55054 -0.08 0.58057 -0.5706 3.45336 -3.00291c1.27828 -1.10987 2.66687 -2.08591 4.14403 -2.91284 1.49321 -0.80541 3.02671 -1.53374 4.59451 -2.18212 0.8508 -0.36035 1.7116 -0.71069 2.5725 -1.00097 1.8315 -0.67822 3.7212 -1.1875 5.6455 -1.52148 0.9008 0.39038 0.7707 0.73071 0.7507 1.00097 -0.0373 0.50528 -0.1279 1.0052 -0.2703 1.49145l-1.2912 4.36425c-0.2603 0.87085 -0.5405 1.68165 -0.8308 2.47245 -0.7107 1.9118 -1.4915 3.7036 -2.2122 5.7756 -0.1688 0.4702 -0.3695 0.9284 -0.6006 1.3713 -0.3703 0.7007 -0.7907 1.3713 -1.1811 2.002 -0.1101 0.2039 -0.2374 0.3981 -0.3804 0.5805l-0.1001 0.1201 -0.06 -0.09 -1.001 -1.5716c-0.4936 -0.6771 -1.0215 -1.3286 -1.5816 -1.9519 -0.5617 -0.6286 -1.1599 -1.2235 -1.7917 -1.7817 -0.4304 -0.3604 -1.6416 -1.3613 -2.00195 -0.6406 -0.1001 0.1301 -0.21021 0.3803 -0.27027 0.4504l-1.17114 1.7017 -1.18115 2.092c-0.4204 0.7307 -0.92089 1.4214 -1.37133 2.1521 -0.19018 0.3203 -0.38037 0.6506 -0.54053 1.001 -0.03442 0.0717 -0.03899 0.1541 -0.01272 0.2291 0.02627 0.0751 0.08125 0.1367 0.15286 0.1713 0 0 0.28027 0.2302 0.69067 -0.0801s0.53052 -0.3904 0.76074 -0.5706c0.23023 -0.1802 0.76074 -0.5505 1.1311 -0.8108 0.37036 -0.2602 0.67066 -0.4504 1.00098 -0.6806l1.52144 -1.0611c0.8008 -0.5705 1.5716 -1.1611 2.3223 -1.7917l0.1702 0.1902c0.5405 0.6306 1.051 1.2912 1.4914 1.9118l0.9009 1.5415c0.0917 0.1707 0.1954 0.3346 0.3103 0.4905 0.0573 0.0607 0.1276 0.1075 0.2056 0.137 0.0781 0.0294 0.1618 0.0408 0.2448 0.0332 0.2372 -0.039 0.459 -0.143 0.6407 -0.3003 0.2845 -0.2759 0.5303 -0.589 0.7307 -0.9309 0.4104 -0.6306 0.8608 -1.3213 1.2512 -2.002 0.2689 -0.4783 0.4998 -0.977 0.6907 -1.4914 0.7407 -2.062 1.5615 -3.8337 2.2822 -5.7256 0.3203 -0.8208 0.6106 -1.6516 0.8808 -2.54246l1.3013 -4.40429c0.2428 -0.81464 0.3543 -1.66274 0.3303 -2.51244ZM9.10233 19.2827c-0.34559 0.2232 -0.67967 0.4637 -1.00098 0.7207 -0.34033 0.2702 -0.66064 0.5505 -1.00097 0.8508l-0.75073 0.7707c0.39038 -0.5905 0.80078 -1.1611 1.16113 -1.7617l1.24121 -2.0019 1.15112 -1.6516c0.05005 -0.0601 0.20019 -0.3103 0.26029 -0.4104 0.06 -0.1001 0.2002 0.1301 0.3103 0.2102 0.1101 0.08 0.4504 0.4104 0.5805 0.5205 0.3404 0.3103 0.6807 0.6606 1.001 1.0009 -0.9509 0.6307 -1.9819 1.1412 -2.95287 1.7518Z",
  },
  {
    fill: "#0c6fff",
    d: "M13.6868 9.67329c-0.5305 0.58061 -1.001 1.19121 -1.5215 1.82181 -0.5205 0.6306 -1.1211 1.4414 -1.6316 2.2021 -0.1101 0.1602 -0.2102 0.3303 -0.3103 0.4905 -0.26025 0.7908 0.1101 0.6706 0.8008 0.0801l0.0901 -0.1402c0.5605 -0.7107 1.1911 -1.3813 1.7817 -2.0019 0.9509 -1.0911 2.002 -2.0921 3.0029 -3.08302l2.2222 -2.09204c1.0911 -1.00097 2.1821 -2.062 3.2532 -3.11303 1.6215 -2.842763 -2.7928 1.16113 -5.1751 3.33325 -0.8708 0.83081 -1.7116 1.62158 -2.5124 2.50243Z",
  },
  {
    fill: "#0c6fff",
    d: "M13.2865 6.61034c-1.3914 0.94092 -2.7327 1.94189 -4.07397 3.00293L6.04945 12.1858c-0.20019 0.1801 -0.43042 0.3703 -0.66064 0.5605 -0.48047 0.6006 -0.4104 0.8208 0.68066 0.3403 0.16016 -0.1101 0.32031 -0.2202 0.45044 -0.3303l3.30321 -2.3623 8.22798 -5.6755c0.8108 -0.55053 1.5916 -1.10107 2.4024 -1.63159 0.1902 -0.67065 -1.2312 -0.20019 -2.4024 0.49048l-0.5305 0.32031c-1.4214 0.89087 -2.8528 1.76172 -4.2341 2.71264Z",
  },
];
