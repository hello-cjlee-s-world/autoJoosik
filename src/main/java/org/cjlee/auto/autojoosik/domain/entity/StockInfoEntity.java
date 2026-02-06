package org.cjlee.auto.autojoosik.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.cjlee.auto.autojoosik.autojoosik.marketList.bean.StockInfoVO;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tb_stock_info")
public class StockInfoEntity {
    private static final String serialVersionUID = String.valueOf(1L);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id")
//    private String id;
    @Column(name = "stk_cd")
    private String stkCd;

    @Column(name = "stk_nm")
    private String stkNm;

    @Column(name = "setl_mm")
    private String setlMm;

    @Column(name = "fav")
    private String fav;

    @Column(name = "cap")
    private String cap;

    @Column(name = "flo_stk")
    private String floStk;

    @Column(name = "crd_rt")
    private String crdRt;

    @Column(name = "oyr_hgst")
    private String oyrHgst;

    @Column(name = "oyr_lwst")
    private String oyrLwst;

    @Column(name = "mac")
    private String mac;

    @Column(name = "mac_wght")
    private String macWght;

    @Column(name = "for_exh_rt")
    private String forExhRt;

    @Column(name = "repl_pric")
    private String replPric;

    @Column(name = "per")
    private String per;

    @Column(name = "eps")
    private String eps;

    @Column(name = "roe")
    private String roe;

    @Column(name = "pbr")
    private String pbr;

    @Column(name = "ev")
    private String ev;

    @Column(name = "bps")
    private String bps;

    @Column(name = "sale_amt")
    private String saleAmt;

    @Column(name = "bus_pro")
    private String busPro;

    @Column(name = "cup_nga")
    private String cupNga;

    @Column(name = "250hgst")
    private String hgst250;

    @Column(name = "250lwst")
    private String lwst250;

    @Column(name = "high_pric")
    private String highPric;

    @Column(name = "open_pric")
    private String openPric;

    @Column(name = "low_pric")
    private String lowPric;

    @Column(name = "upl_pric")
    private String uplPric;

    @Column(name = "lst_pric")
    private String lstPric;

    @Column(name = "base_pric")
    private String basePric;

    @Column(name = "exp_cntr_pric")
    private String expCntrPric;

    @Column(name = "exp_cntr_qty")
    private String expCntrQty;

    @Column(name = "250hgst_pric_dt")
    private String hgst250PricDt;

    @Column(name = "250hgst_pric_pre_rt")
    private String hgst250PricPreRt;

    @Column(name = "250lwst_pric_dt")
    private String lwst250PricDt;

    @Column(name = "250lwst_pric_pre_rt")
    private String lwst250PricPreRt;

    @Column(name = "cur_prc")
    private String curPrc;

    @Column(name = "pre_sig")
    private String preSig;

    @Column(name = "pred_pre")
    private String predPre;

    @Column(name = "flu_rt")
    private String fluRt;

    @Column(name = "trde_qty")
    private String trdeQty;

    @Column(name = "trde_pre")
    private String trdePre;

    @Column(name = "fav_unit")
    private String favUnit;

    @Column(name = "dstr_stk")
    private String dstrStk;

    @Column(name = "dstr_rt")
    private String dstrRt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public StockInfoVO toStockInfo() {
        StockInfoVO vo = new StockInfoVO();
//        vo.setId(this.id);
        vo.setStkCd(this.stkCd);
        vo.setStkNm(this.stkNm);
        vo.setSetlMm(this.setlMm);
        vo.setFav(this.fav);
        vo.setCap(this.cap);
        vo.setFloStk(this.floStk);
        vo.setCrdRt(this.crdRt);
        vo.setOyrHgst(this.oyrHgst);
        vo.setOyrLwst(this.oyrLwst);
        vo.setMac(this.mac);
        vo.setMacWght(this.macWght);
        vo.setForExhRt(this.forExhRt);
        vo.setReplPric(this.replPric);
        vo.setPer(this.per);
        vo.setEps(this.eps);
        vo.setRoe(this.roe);
        vo.setPbr(this.pbr);
        vo.setEv(this.ev);
        vo.setBps(this.bps);
        vo.setSaleAmt(this.saleAmt);
        vo.setBusPro(this.busPro);
        vo.setCupNga(this.cupNga);
        vo.setHgst250(this.hgst250);
        vo.setLwst250(this.lwst250);
        vo.setHighPric(this.highPric);
        vo.setOpenPric(this.openPric);
        vo.setLowPric(this.lowPric);
        vo.setUplPric(this.uplPric);
        vo.setLstPric(this.lstPric);
        vo.setBasePric(this.basePric);
        vo.setExpCntrPric(this.expCntrPric);
        vo.setExpCntrQty(this.expCntrQty);
        vo.setHgst250PricDt(this.hgst250PricDt);
        vo.setHgst250PricPreRt(this.hgst250PricPreRt);
        vo.setLwst250PricDt(this.lwst250PricDt);
        vo.setLwst250PricPreRt(this.lwst250PricPreRt);
        vo.setCurPrc(this.curPrc);
        vo.setPreSig(this.preSig);
        vo.setPredPre(this.predPre);
        vo.setFluRt(this.fluRt);
        vo.setTrdeQty(this.trdeQty);
        vo.setTrdePre(this.trdePre);
        vo.setFavUnit(this.favUnit);
        vo.setDstrStk(this.dstrStk);
        vo.setDstrRt(this.dstrRt);
        vo.setUpdatedAt(this.updatedAt);

        return vo;
    }
}
