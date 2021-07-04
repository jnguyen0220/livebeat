<script>
import ioClient from "socket.io-client";
import {CONSTANT} from "../config";

export default {
  name: "messenger",
  props: ['send'],
  data: () => ({
    socket: null,
  }),
  methods: {
    onWelcome(data) {
      this.$emit('on-message', {type: 'welcome', message: data});
    },
    onResult(data) {
      this.$emit('on-message', {type: 'result', message: data});
    },
    onDisabled(data) {
      this.$emit('on-message', {type: 'disabled', message: data});
    },
    onAdd(data) {
      this.$emit('on-message', {type: 'add', message: data});
    },
    onRemove(data) {
      this.$emit('on-message', {type: 'remove', message: data.ids});
    }
  },
  watch: { 
    send({type, message}, oldVal) { 
      this.socket.emit(type, message);
    }
  },
  render() {
    return null;
  },
  beforeMount() {
    this.socket = ioClient(CONSTANT.SOCKET_URL);
    [
        { topic: 'welcome', func: this.onWelcome },
        { topic: 'disabled', func: this.onDisabled },
        { topic: 'result', func: this.onResult },
        { topic: 'add', func: this.onAdd },
        { topic: 'remove', func: this.onRemove },
    ].forEach(x => this.socket.on(x.topic, x.func));
  }
}
</script>