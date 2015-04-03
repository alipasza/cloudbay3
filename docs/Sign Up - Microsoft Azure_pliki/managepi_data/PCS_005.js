/*
strIdList is string of id pair.
a json object like: 
{"Items":"PIList","SubItems":"ChoosePITitle"}
*/

function PageItem(strIdListObject) {

    this.hasVisibleItem = function () {
        return this.getComponents().length > 0;
    };

    this.getComponents = function () {
        return $(this.IDList);
    };

    this.contains = function (selector) {
        var selected = $(selector);
        if (selected.length == 0) {
            return false;
        }
        
        if (this.getComponents().has(selected).length > 0) {
            return true;
        }

        return false;
    }

    // return the list jsonObj
    this.getVisibleIdList = function (strIdList) {
        var result = [];
        if (!strIdList) {
            return result;
        }

        var ids = strIdList.split(",");

        $.each(ids, function (index, value) {
            var strId = $.trim(value);
            if (strId == "") {
                return;
            }

            // we handle only visible items.
            var item = $('#' + strId);
            if (item.children(':visible').length == 0) {
                return;
            }

            result.push(strId);

        });

        return result;
    };

    this.buildIDList = function (strIdListObject) {
        var result = "";

        if (!strIdListObject) {
            return result;
        }

        var mainVisibleItems = this.getVisibleIdList(strIdListObject.Items);
        if (mainVisibleItems.length == 0) {
            return result;
        }

        var subVisibleItems = this.getVisibleIdList(strIdListObject.SubItems);

        $.each($.merge(mainVisibleItems, subVisibleItems), function (index, value) {
            result += "#" + value + ",";
        });

        return result;
    }

    this.IDList = this.buildIDList(strIdListObject);
};

// pageList: [{"Items":"PIList","SubItems":"ChoosePITitle"},{"Items":"pi-card","SubItems":"PIDetailTitle"},{"Items":"pi-addr","SubItems":null},{"Items":"pi-extra","SubItems":null}];
// first page selector: when resetting, we expect the items in firstPageSelector can be show in first page.
// onPageDisplayed: call back when apply a page. onPageDisplayed(PageMananger);
function PageManager(pageLists, firstPageSelector, onPageDisplayed) {

    this.rawPageLists = pageLists;
    this.CurrentPageIndex = 0;
    this.PageList = [];
    this.firstPageSelector = firstPageSelector;
    this.onPageDisplayed = onPageDisplayed;
    
    this.getPageCount = function () {
        return this.PageList.length;
    };

    this.defaultPageIndex = function () {
        if (!this.firstPageSelector) {
            return 0;
        }

        var selected = $(this.firstPageSelector);
        if (selected.length == 0) {
            return 0;
        }

        // before first page, there should be no invalid field.
        // to do: consider multiple for in one page
        $('form').validate().checkForm();
        var clientSideInvalidFields = $('form').validate().invalidElements();
        var pageCount = this.getPageCount();
        for (var index = 0; index < pageCount; ++index) {
            var currentPageComponents = this.PageList[index].getComponents();
            if (currentPageComponents.has(selected).length > 0
            || currentPageComponents.has(clientSideInvalidFields).length > 0) {
                return index;
            }
        }

        return 0;
    };

    // public
    this.regenerate = function () {
        this.reset();
        this.PageList = this.buildPageList(pageLists);
        this.CurrentPageIndex = this.defaultPageIndex();
    };

    this.buildPageList = function (pageLists) {
        var result = [];
        if (!pageLists || !$.isArray(pageLists)) {
            return result;
        }

        $.each(pageLists, function (index, value) {
            var pageItem = new PageItem(value);
            if (!pageItem.hasVisibleItem()) {
                return;
            }

            result.push(pageItem);
        });

        return result;
    };


    this.getCurrentPage = function () {
        if (this.CurrentPageIndex < this.getPageCount()) {
            return this.PageList[this.CurrentPageIndex];
        }

        return null;
    };

    this.hasNext = function () {
        return (this.CurrentPageIndex + 1) < this.getPageCount();
    };

    this.hasPrevious = function () {
        return this.getPageCount() > 0 && this.CurrentPageIndex > 0;
    };

    this.next = function () {
        if (!this.hasNext()) {
            return;
        }

        ++this.CurrentPageIndex;
        this.apply();
    };

    this.previous = function () {
        if (!this.hasPrevious()) {
            return;
        }

        --this.CurrentPageIndex;
        this.apply();
    };

    // show current page and hide other pages
    this.apply = function () {
        var pageManager = this,
            currentPageItem = null;
        $.each(this.PageList, function (index, pageItem) {
            if (index == pageManager.CurrentPageIndex) {
                currentPageItem = pageItem;
                // pageManager.showPage(pageItem);
            }
            else {
                pageManager.hidePage(pageItem);
            }
        });

        // display at last.
        // if an item is in both current page and other page, 
        // display it. 
        if (!!currentPageItem) {
            pageManager.showPage(currentPageItem);
        }

        if (!!onPageDisplayed) {
            onPageDisplayed(pageManager);
        }

        // if in first page, disable the "Previous" button,
        // otherwise enable it
        if (!pageManager.hasPrevious()) {
            $('#btnPrevous').prop("disabled", true);
        } else {
            $('#btnPrevous').prop("disabled", false);
        }
    };

    this.reset = function () {
        var pageManager = this;
        $.each(this.PageList, function (index, pageItem) {
            // all pageItems should be visible by default
            pageManager.showPage(pageItem);
        });
    }

    this.hidePage = function (pageItem) {
        if (!pageItem) {
            return;
        }

        pageItem.getComponents().hide();
        // pageItem.getComponents().addClass('pagination-hidden');
    };

    this.showPage = function (pageItem) {
        if (!pageItem) {
            return;
        }

        pageItem.getComponents().show();
        // pageItem.getComponents().removeClass('pagination-hidden');
    };
}
