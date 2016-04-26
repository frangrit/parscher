if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.removeformat = function()
{
	return {
		init: function()
		{
            var button = this.button.add('removeformat', 'Removeformat');
			this.button.addCallback(button, this.removeformat.insertCleanHtml);
            // if you don't like the icon, just get rid of the next line
            this.button.setIcon(button, '<i style="display:block;width: 16px;height: 16px;background-repeat: no-repeat;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAZwAAAGcB1SjUJgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADRSURBVDiNxdM9SkNBFIbhZ0IghY1JZWNhFmHAPn0K15EtuISsQMgK7MXSTnABNsHuQpoQAun02Awhhpl7hRQe+GDgm3fOz8ykiHBO9M6i0W8zU0o9TDEs2IE3EVFUru4pb6ypaTtg0QEHljV4/gf4FYMSPMNXB/yBUUQ4hSfYd8BrjA/METzOZhu8x+RX0gyPclkPuCzoDlvMCi0b5IE8VgZ6hU/MK74lntEvmBd4x6J23QkNVtgVXtt1bu0+Ir4LvoQb3Ob1aWzwUoMh/ftv/AHu8/+8nvtUJgAAAABJRU5ErkJggg==);"></i>');

		},

		insertCleanHtml: function()
		{

            var isRedactorSelected = this.selection.isRedactor();
            if (this.selection.isRedactor()) {
                
                // remove what already can be removed
                this.inline.removeFormat();
                this.inline.removeAllAttr();
                this.inline.removeAllClass();

                // get the current selection
                var html = this.selection.html();
                // Strip out html
                html = html.replace(/(<([^>]+)>)/ig,"");

                // buffer
                this.buffer.set();

                // Replace selection with clean text
                this.selection.replace(html);

                // Sync code
                this.code.sync();
            }

		}
	};
};
